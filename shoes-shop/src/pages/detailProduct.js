import React from 'react'
import Axios from 'axios'

import {
    Image,
    Button
} from 'react-bootstrap'

class DetailProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            image: '',
            selectedSize: null,
            size: null,
            stock: 0,
            total: 0
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/products${this.props.location.search}`)
            .then((res) => {
                console.log(res.data[0].images[1])
                this.setState({ data: res.data[0], image: res.data[0].images[1] })
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { data, image, selectedSize, total, stock } = this.state
        console.log(this.state.data)
        return (
            <div style={{ marginTop: '70px', padding: '0 20px' }}>
                <h1>Product Detail</h1>
                <div style={{ display: 'flex', height: '65vh' }}>
                    <div style={styles.img1}>
                        <Image src={image} rounded style={{ height: '90%', width: '90%' }} />
                    </div>
                    <div style={styles.detail}>
                        <div>
                            <h2>{data.name}</h2>
                            <h6>Category: {data.category}</h6>
                            <h6>Brand: {data.brand}</h6>
                            <h6>Colour: {data.colour}</h6>
                            <h6>Description: {data.description}</h6>
                            <h6>Price: IDR {data.price ? data.price.toLocaleString() : 0}</h6>
                            <div style={styles.adjust}>
                                <div style={{ marginRight: '50px' }}>
                                    <h5>Size : </h5>
                                    <div>
                                        {
                                            (data.stock ? data.stock : []).map((item, index) => {
                                                return <Button
                                                    key={index}
                                                    variant='outlined'
                                                    onClick={() => this.setState({ stock: item.total, selectedSize: index, size: item.code })}
                                                    style={{
                                                        backgroundColor: selectedSize === index ? '#130f40' : '#ffffff',
                                                        color: selectedSize === index ? 'white' : 'black',
                                                        border: '1px #130f40 solid'
                                                    }}
                                                >{item.code}</Button>
                                            })
                                        }
                                    </div>
                                    <h5>{stock ? `* stock = ${stock}` : ''}</h5>
                                </div>
                                <div style={{ width: '20%' }}>
                                    <h5>Total: </h5>
                                    <div style={{ display: 'flex', borderRadius: '5px', backgroundColor: '#ffffff', justifyContent: 'space-between' }}>
                                        <Button
                                            disabled={total <= 0 ? true : false}
                                            onClick={() => this.setState({ total: total - 1 })}
                                            variant="danger"
                                        >-</Button>
                                        <h1>{total}</h1>
                                        <Button
                                            disabled={total >= stock ? true : false}
                                            onClick={() => this.setState({ total: total + 1 })}
                                            variant="primary"
                                        >+</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button onClick={this.handleAddToCart}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    img1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '40%',
        borderRadius: '15px',
        backgroundColor: 'rgba(43, 104, 213, .7)'
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexBasis: '60%',
        backgroundColor: 'salmon',
        padding: '15px',
        borderRadius: '15px'
    },
    total: {
        display: 'flex',
        alignItems: 'center'
    },
    adjust: {
        display: 'flex',
        // alignItems: 'center'
    }
}

export default DetailProduct