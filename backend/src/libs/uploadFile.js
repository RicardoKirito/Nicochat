import fss from 'node:fs/promises';
import fs from 'node:fs'
import {Buffer} from 'buffer'
import { getDirname } from './dirname.js';
import path from 'path';
import imgModel from '../models/img.model.js';

const __dirname = getDirname(import.meta.url)

export async function getChatFiles(folderName){
    const route = __dirname.replace('libs','uploads') + `\\chat\\`;
    if(fs.existsSync(path.join(route, folderName))) return await fss.readdir(path.join(route, folderName)) 
    return []
}

export async function upLoadFile(file, foldersName){
    
    /* const route = __dirname.replace('libs','uploads') + `\\chat\\${foldersName}`;

    if(!fs.existsSync(route)){
        fs.mkdir(path.join(route, ''), (err)=>{
            if(err){
                console.error(err)
            }else{
                console.log("Dir created ", route)
            }
        }) 
        
        
    }
    */

    const parts = file.info.split('.')
    const ext = parts[parts.length -1]
    const filename = `Nico-Chat-${Date.now()}.${ext}`;
    const path = ""
    const add = await imgModel.create({
        folder: `chat/${foldersName}`,
        img: file.data
    })

    
    
    return {
        paths,
        filename
    }

}
export function uploadProfilePicture(userid, file){

    const route = __dirname.replace("libs", 'uploads') + `\\profile`;
    const part = file.info.split('.');
    const ext = part[part.length -1];
    const fileName = `Nico-chat-${userid}.${ext}`
    const paths = route +"\\"+fileName;

    //PARA  AGREGAR LAS FOTOS POR CARPETAS
/*
    if(!fs.existsSync(route)){
        fs.mkdir(route, err=>{
            if(err) throw err;
            console.log("Created at:", route)
        })
    }
    fs.readdir(path, (err, files=>{
        if(err) throw err; 
        files?.forEach(file => {
            fs.unlink(route+file, err=>{
                if(err) throw err;
                console.log('picture deleted')
            })
        });
    })) */


    const buffer = Buffer.from(file.data.split(',')[1], 'base64');

    fs.writeFile(paths, buffer, ()=>{
        console.log('file saved: '+paths)
    });
    return {
        paths,
        fileName
    }
}

export function deleteFile(filename, folderName){
    const paths = __dirname.replace('libs','uploads') + `\\chat\\${folderName}\\` + filename;
    fs.unlink(paths, (err)=>{
        if(err) throw err;
        console.log(`${filename} was deleted`)
    })
    fs.readdir(path.join(paths.replace(filename, '')), (err, files)=>{
        if(files.length === 0){
            fs.unlink(paths.replace(filename, ''), err=>{
                if(err) throw err;
                console.log(folderName, "was deleted")
            })
        }
    })
    
}