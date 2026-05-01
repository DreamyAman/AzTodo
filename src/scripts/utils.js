
/**
 * Fn to generate uid based on timestamp + random number.
 * 
 * @example: 1775225047902.5813 -> 1775225047902
 */
function generateId() {
    const uid = Date.now() + Math.random();

    return uid.toString().split(".")[0];
}
