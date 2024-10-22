
import { KJUR } from "jsrsasign";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (typeof query.slug !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Add a session name as string',
    })
  }
  const JWT = await generateSignature(query.slug, 1);
  return JWT;
})


/**
 * Generates a JWT token for Zoom Video SDK, given a session name and role type.
 * @param {string} sessionName The name of the session.
 * @param {number} role The role type for the JWT token.
 * @returns {string} The JWT token.
 */
function generateSignature(sessionName: string, role: number) {
  const runtimeConfig = useRuntimeConfig();
  const sdkKey = runtimeConfig.ZoomVideoSDKKey;
  const sdkSecret = runtimeConfig.ZoomVideoSDKSecret;
  if (!sdkKey || !sdkSecret) {
    throw new Error("Missing ZOOM_SDK_KEY or ZOOM_SDK_SECRET");
  }
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };
  const oPayload = {
    app_key: sdkKey, tpc: sessionName, role_type: role, version: 3, iat: iat, exp: exp,
  };
  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
  return sdkJWT;
}
