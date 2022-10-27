
export const fileUpload = async( file ) => {
    // if ( !file ) throw new Error('No se agregaron archivos');
    if ( !file ) return null;
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/reactimg/upload';
    
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file);

    try {

        const response = await fetch( cloudUrl, {
            method: 'POST',
            body: formData

        });
        
        if ( !response.ok ) throw new Error('No se pudo subir imagenes');

        const cloudResponse = await response.json();
        return cloudResponse.secure_url;
        
    } catch (error) {
        // throw new Error( error.message );
        return null;
    }



}
