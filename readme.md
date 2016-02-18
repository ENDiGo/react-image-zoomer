# React Image Zoomer/Magnifier Component

## Install
1. clone this repository

## How to use
``
import ImageZoomer from 'react-image-zoomer';
``
<br/>...
<br/>...<br/>
``
class Product extends React.Component {
  render(){
    return
      <ImageZoomer alt="Image alt"
        src='path/to/image'
        zoomSrc='path/to/big-image'/>
  }
}
``

## Properties

src                        - small image url (required)                
zoomSrc                    - zoom image url (required)                 
className                  - container css classname                   
alt                        - html img tag alt property value           
onZoomIn                   - callback function on zoom in              
onZoomOut                  - callback function on zoom out             
