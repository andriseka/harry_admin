import Resizer from 'react-image-file-resizer';

export const imageResizer = (file, width, height) => 
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file, width, height, 'png', 40, 0,
            (uri) => {
                resolve(uri)
            },
            'file'
        )
    })