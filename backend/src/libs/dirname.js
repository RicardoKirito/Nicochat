import path from "path"
import { fileURLToPath } from "url";

export function getDirname (modelurl){
    const filename = fileURLToPath(modelurl)
    return path.dirname(filename)
}