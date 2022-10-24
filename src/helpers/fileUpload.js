
export const fileUpload = async (file) =>{
    if(!file) throw new Error('No hay un file a subir.')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dgt01p0qg/upload'

    const formData = new FormData()
    formData.append('upload_preset', 'shadowjournal')
    formData.append('file', file)

    // console.log(typeof file);
    // console.log('ACA >> ', JSON.stringify(file))
    // console.log('eSTE >> ', formData)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if(!resp.ok) throw new Error('No se pudo subir el archivo')

        const {secure_url} = await resp.json()
        // console.log({secure_url})
        return {secure_url};

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }

}