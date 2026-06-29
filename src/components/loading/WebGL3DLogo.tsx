import { useRef, useEffect, useImperativeHandle, type Ref } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface WebGL3DLogoRef {
  setGlow: (val: number) => void;
  setSheenPos: (val: number) => void;
  setBevelDepth: (val: number) => void;
  setLightOffset: (x: number, y: number) => void;
  stopLoop: () => void;
}

interface WebGL3DLogoProps {
  className?: string;
  ref?: Ref<WebGL3DLogoRef>;
}

export function WebGL3DLogo({ className = '', ref }: WebGL3DLogoProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Respect OS-level "reduce motion" preference (WCAG 2.3.3)
    const shouldReduceMotion = useReducedMotion();

    // Keep uniforms in a mutable ref to bypass React rendering
    const uniforms = useRef({
      glow: 0.0,
      sheenPos: -1.2,
      bevelDepth: 1.8,
      lightOffsetX: 0.0,
      lightOffsetY: 0.0,
      active: true,
    });

    // References to draw methods for imperative execution
    const drawSingleFrameRef = useRef<(() => void) | null>(null);

    useImperativeHandle(ref, () => ({
      setGlow: (val) => {
        uniforms.current.glow = val;
      },
      setSheenPos: (val) => {
        uniforms.current.sheenPos = val;
      },
      setBevelDepth: (val) => {
        uniforms.current.bevelDepth = val;
      },
      setLightOffset: (x, y) => {
        uniforms.current.lightOffsetX = x;
        uniforms.current.lightOffsetY = y;
      },
      stopLoop: () => {
        uniforms.current.active = false;
        if (drawSingleFrameRef.current) {
          drawSingleFrameRef.current();
        }
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
      if (!gl) return;

      // Vertex Shader
      const vsSource = `
        attribute vec2 aPosition;
        varying vec2 vUv;
        void main() {
          vUv = aPosition * 0.5 + 0.5;
          vUv.y = 1.0 - vUv.y; // Flip Y for proper texture orientation
          gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `;

      // Fragment Shader (Optimized Blinn-Phong Shading, Multi-scale Beveling & Rim Light)
      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        
        uniform sampler2D uTexture;
        uniform vec2 uResolution;
        uniform float uBevelDepth;
        uniform float uShininess;
        uniform float uGlow;
        uniform float uSheenPos;
        uniform vec2 uLightOffset;

        float getAlpha(vec2 uv) {
          if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
          return texture2D(uTexture, uv).a;
        }

        // Multi-scale sampling to produce soft height slopes inside the solid regions
        float getHeight(vec2 uv) {
          float a = getAlpha(uv);
          if (a < 0.02) return 0.0;

          float stepX = 1.2 / uResolution.x;
          float stepY = 1.2 / uResolution.y;

          // Compute distance-field height profile
          float sum = a * 0.45;
          sum += getAlpha(uv + vec2(stepX, stepY)) * 0.08;
          sum += getAlpha(uv - vec2(stepX, stepY)) * 0.08;
          sum += getAlpha(uv + vec2(-stepX, stepY)) * 0.08;
          sum += getAlpha(uv - vec2(-stepX, stepY)) * 0.08;
          
          sum += getAlpha(uv + vec2(stepX * 2.5, 0.0)) * 0.06;
          sum += getAlpha(uv - vec2(stepX * 2.5, 0.0)) * 0.06;
          sum += getAlpha(uv + vec2(0.0, stepY * 2.5)) * 0.06;
          sum += getAlpha(uv - vec2(0.0, stepY * 2.5)) * 0.06;

          return sum;
        }

        void main() {
          vec4 baseColor = texture2D(uTexture, vUv);
          
          if (baseColor.a < 0.02) {
            discard;
          }

          float stepX = 1.0 / uResolution.x;
          float stepY = 1.0 / uResolution.y;

          // Estimate derivatives using soft height profiles
          float hLeft  = getHeight(vUv - vec2(stepX * 2.0, 0.0));
          float hRight = getHeight(vUv + vec2(stepX * 2.0, 0.0));
          float hDown  = getHeight(vUv - vec2(0.0, stepY * 2.0));
          float hUp    = getHeight(vUv + vec2(0.0, stepY * 2.0));

          float dx = (hRight - hLeft) * 2.0;
          float dy = (hUp - hDown) * 2.0;

          // Normal vector construction
          vec3 normal = normalize(vec3(-dx * uBevelDepth, -dy * uBevelDepth, 1.0));

          // Camera view direction
          vec3 viewDir = vec3(0.0, 0.0, 1.0);

          // Studio Lights Setup (Key Light and Soft Fill Light)
          vec3 keyLight = normalize(vec3(-1.0 + uLightOffset.x * 0.5, 1.2 + uLightOffset.y * 0.5, 0.75));
          vec3 fillLight = normalize(vec3(1.0, -1.0, 0.4));

          // Blinn-Phong Diffuse & Specular Shading
          float diffuse1 = max(dot(normal, keyLight), 0.0);
          vec3 halfDir = normalize(keyLight + viewDir);
          float spec = pow(max(dot(normal, halfDir), 0.0), uShininess);
          
          float diffuse2 = max(dot(normal, fillLight), 0.0);

          // Diagonal light sweep
          float sheenVal = 0.0;
          float lineCoord = vUv.x + vUv.y * 0.45;
          float dist = abs(lineCoord - uSheenPos);
          if (dist < 0.16) {
            sheenVal = smoothstep(0.16, 0.0, dist) * 0.45;
          }

          // Shading integration (luxurious metallic feel)
          vec3 litColor = baseColor.rgb * (0.65 + diffuse1 * 0.35 + diffuse2 * 0.15);
          litColor += vec3(1.0) * (spec * 0.55 + sheenVal);

          // Soft Rim Light (Fresnel highlight for Apple-style render feel)
          float fresnel = 1.0 - max(dot(normal, viewDir), 0.0);
          fresnel = pow(fresnel, 4.0);
          vec3 rimColor = mix(vec3(0.05, 0.43, 1.0), vec3(0.08, 0.85, 0.77), vUv.x); // Blue/teal gradient rim glow
          litColor += rimColor * fresnel * 0.32;

          // Ambient blue-teal glow
          vec3 glowColor = mix(vec3(0.05, 0.43, 1.0), vec3(0.08, 0.85, 0.77), vUv.x);
          litColor += glowColor * uGlow * 0.15;

          gl_FragColor = vec4(litColor, baseColor.a);
        }
      `;

      // Compile Shader Helper
      const compileShader = (source: string, type: number) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = compileShader(vsSource, gl.VERTEX_SHADER);
      const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
      if (!vs || !fs) return;

      // Link Shader Program
      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return;
      }
      gl.useProgram(program);

      // Fullscreen Quad Setup
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      const positionLoc = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      // Setup Texture Unit
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Render 1x1 empty pixel initially
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 0]),
      );

      // Bind uniform variables
      const uTextureLoc = gl.getUniformLocation(program, 'uTexture');
      const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
      const uBevelDepthLoc = gl.getUniformLocation(program, 'uBevelDepth');
      const uShininessLoc = gl.getUniformLocation(program, 'uShininess');
      const uGlowLoc = gl.getUniformLocation(program, 'uGlow');
      const uSheenPosLoc = gl.getUniformLocation(program, 'uSheenPos');
      const uLightOffsetLoc = gl.getUniformLocation(program, 'uLightOffset');

      gl.uniform1i(uTextureLoc, 0);

      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        const size = canvas.getBoundingClientRect();
        const width = Math.floor(size.width * dpr);
        const height = Math.floor(size.height * dpr);

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      };

      const drawSingleFrame = () => {
        resize();
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
        gl.uniform1f(uBevelDepthLoc, uniforms.current.bevelDepth);
        gl.uniform1f(uShininessLoc, 32.0);
        gl.uniform1f(uGlowLoc, uniforms.current.glow);
        gl.uniform1f(uSheenPosLoc, uniforms.current.sheenPos);
        gl.uniform2f(uLightOffsetLoc, uniforms.current.lightOffsetX, uniforms.current.lightOffsetY);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      drawSingleFrameRef.current = drawSingleFrame;

      // 60FPS Draw loop — use a local variable (not a React ref) so cleanup
      // always cancels the exact frame ID that was scheduled on this mount.
      let animFrameId: number | null = null;
      const draw = () => {
        if (!uniforms.current.active) return;
        drawSingleFrame();
        animFrameId = requestAnimationFrame(draw);
      };

      // Loading PNG asset
      const img = new Image();
      img.src = '/logo.webp';
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        drawSingleFrame();
        // Skip animation loop entirely for users who prefer reduced motion (WCAG 2.3.3)
        if (uniforms.current.active && !shouldReduceMotion) {
          draw();
        }
      };

      return () => {
        if (animFrameId !== null) cancelAnimationFrame(animFrameId);
        gl.deleteBuffer(positionBuffer);
        gl.deleteTexture(texture);
        gl.deleteProgram(program);
      };
    }, [shouldReduceMotion]);

    // Listen to resize to redraw when static
    useEffect(() => {
      const handleResize = () => {
        if (!uniforms.current.active && drawSingleFrameRef.current) {
          drawSingleFrameRef.current();
        }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className={`w-full h-full block select-none pointer-events-none ${className}`}
        style={{ backfaceVisibility: 'hidden' }}
      />
    );
}
