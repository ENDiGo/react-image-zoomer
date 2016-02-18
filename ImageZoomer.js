import React, {Component, PropTypes} from 'react';

let containerStyle = {
    overflow: 'hidden',
    position: 'relative'
}, zoomStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    border: 'none',
    maxWidth: 'none',
    maxHeight: 'none',
}

class ImageZoomer extends Component {
    constructor(props){
        super(props);

        this.containerOffset = {};
        this.ratio = {};
        this.state = {
            zoomStyle: zoomStyle,
        }
    }

    onMouseEnter(event){
        event.preventDefault();
        let $container = $(this.refs.container);
        this.containerOffset =  Object.assign({}, $container.offset(), { width: $container.outerWidth(), height: $container.outerHeight()});

        let width = this.refs.zoomImage.width,
            height = this.refs.zoomImage.height;

        
        zoomStyle = Object.assign({}, zoomStyle, { width: width, height: height});

        this.ratio = {
            xRatio: (width - this.containerOffset.width) / this.containerOffset.width,
            yRatio: (height - this.containerOffset.height) / this.containerOffset.height
        }

        this.props.onZoomIn();
    }

    onMouseMove(event){
        event.preventDefault();
        
        let offset = this.containerOffset, 
        top = event.pageY - offset.top,
        left = event.pageX - offset.left; 

        top = Math.max(Math.min(top, offset.height), 0) * -this.ratio.yRatio;
        left = Math.max(Math.min(left, offset.width), 0) * -this.ratio.xRatio;

        this.setState({
            zoomStyle: Object.assign({}, zoomStyle, { opacity: 1, left: left, top: top})
        })
    }

    onMouseLeave(event){
        event.preventDefault();

        this.setState({
            zoomStyle: Object.assign({}, this.state.zoomStyle, { opacity: 0})
        })

        this.props.onZoomOut();
    }

    render(){
        return (
            <div onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseMove={this.onMouseMove.bind(this)} 
                onMouseLeave={this.onMouseLeave.bind(this)}
                onTouchStart={this.onMouseEnter.bind(this)}
                onTouchMove={this.onMouseMove.bind(this)} 
                onTouchEnd={this.onMouseLeave.bind(this)}
                style={containerStyle} 
                className={this.props.className}
                ref="container">
                <img src={this.props.src} alt={this.props.alt}/>
                <img src={this.props.zoomSrc} style={this.state.zoomStyle} ref="zoomImage" alt={this.props.alt}/>
            </div>
        )
    }
}

ImageZoomer.displayName = 'ImageZoomer';

ImageZoomer.propTypes = {
    src: PropTypes.string.isRequired,
    zoomSrc: PropTypes.string.isRequired,
    className: PropTypes.string,
    alt: PropTypes.string,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
}

ImageZoomer.defaultProps = {
    onZoomIn: function(){},
    onZoomOut: function(){},
}


export default ImageZoomer;