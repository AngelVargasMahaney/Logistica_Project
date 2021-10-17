import React from 'react'
import Viewer from 'react-viewer';

const VisualizadorImagenes = (props) => {
    console.log(props)
    return (
        <div>
            {/* <button onClick={() => { setVisible(true); }}>show</button> */}
            <Viewer
                visible={props.visible}
                onClose={props.onClose}
                images={[{
                    src: props.imagen,
                    alt: props.imagenDescripcion,
                    defaultSize: { width: 320, height: 320 },

                }]}
            />
        </div>
    )
}

export default VisualizadorImagenes
