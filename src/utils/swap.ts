/**Swaps two array indices (mutating the array). */
function swap(arr: any[], i1: number, i2: number) {
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

export default swap;