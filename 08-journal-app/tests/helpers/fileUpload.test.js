import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'reactimg',
    api_key: '471785978533299',
    api_secret: 'Zff2ctj90i_4fCdigTE8Yqtjyfg',
    secure: true,
});

describe('Pruebas en fileUpload', () => { 
    test('Debe subir el archivo correctamente a cloudnary', async() => { 
        const imageUrl = 'https://media.gettyimages.com/photos/labrador-puppy-ready-for-play-picture-id1209632024?s=612x612';
        const response = await fetch( imageUrl );
        const blob = await response.blob();
        const file =  new File([blob], 'img.jpg');
        
        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
        
        const cloudResponse = await cloudinary.api.delete_resources([ `journal/${ imageId }` ], {
            resource_type: 'image',
        });
        console.log({ cloudResponse });

     });

     test('Debe devovler null', async() => { 
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );
      })
 });    