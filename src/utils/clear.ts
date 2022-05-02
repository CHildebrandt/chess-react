import { v1 } from 'uuid';

/** Returns a new empty square (used for capturing) */
function clear() {
    return { id: v1(), type: undefined }
}

export default clear