precision mediump float;
// uniform float ratio;
// uniform sampler2D textureUnit1;
// uniform sampler2D textureUnit2;
// uniform sampler2D textureUnit3;
varying vec4 vColor;
varying vec2 vTexCoord;

// void main() {
//   // テクスチャから色を読み出す
//   vec4 samplerColor1 = texture2D(textureUnit1, vTexCoord);
//   vec4 samplerColor2 = texture2D(textureUnit2, vTexCoord);
//   vec4 samplerColor3 = texture2D(textureUnit3, vTexCoord);

//   // ３枚目のテクスチャの色はトランジション係数として使う @@@
//   // ratio 0.0〜1.0  => 0.0〜2.0

//   float r = clamp(ratio * 2.0 - samplerColor3.r, 0.0, 1.0);

//   // テクスチャ由来の２つの色を補間する
//   vec4 blendColor = mix(samplerColor1, samplerColor2, r);
//   gl_FragColor = vColor * blendColor;
// }

uniform sampler2D textureUnit1;
uniform sampler2D textureUnit2;
uniform sampler2D disp;

        // uniform float time;
        // uniform float _rot;
uniform float ratio;
uniform float effectFactor;

        // vec2 rotate(vec2 v, float a) {
        //  float s = sin(a);
        //  float c = cos(a);
        //  mat2 m = mat2(c, -s, s, c);
        //  return m * v;
        // }

void main() {


  vec4 disp = texture2D(disp, vTexCoord);

  vec2 distortedPosition = vec2(vTexCoord.x + ratio * (disp.r * effectFactor), vTexCoord.y);
  vec2 distortedPosition2 = vec2(vTexCoord.x - (1.0 - ratio) * (disp.r * effectFactor), vTexCoord.y);

  vec4 _texture = texture2D(textureUnit1, distortedPosition);
  vec4 _texture2 = texture2D(textureUnit2, distortedPosition2);

  vec4 finalTexture = mix(_texture, _texture2, ratio);

  gl_FragColor = finalTexture;
            // gl_FragColor = disp;
}