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
                noNavbar={true}
                images={[{
                    src: props.imagen,
                    alt: props.imagenDescripcion,
                    defaultSize: { width: 320, height: 320 },
                }]}
                changeable={false}
                customToolbar={toolbars => {
              return toolbars.concat([
                {
                  key: "test",
                  render: <div><i className="fa fa-print"></i></div>,
                  onClick: activeImage => {
                      window.focus()
                      window.print()
                    // handlePrint()
                  }
                }
              ]);
            }}
            />
         
        </div>
    )
}

export default VisualizadorImagenes
