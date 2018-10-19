import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import { MenuItem } from '@material-ui/core';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 400,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      actions: {
        display: 'flex',
      },
  });

  const ITEM_HEIGHT = 40;
  
class Products extends Component {

    
    constructor() {
        super();
        this.state = {
            products: [],
            searchString: ''
        };
        this.getProducts()
    }
    state = {
        anchorEl: null,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
      

      delete = id => {
        alert(id)
        axios.post('http://localhost:9022/products/delete/'+id)
          .then(res => {
            let updatedProducts = [...this.state.products].filter(i => i.id !== id);
            this.setState({products: updatedProducts});
          });
      }

      edit = id => {
        debugger
        axios.post('http://localhost:9022/products/edit/'+id)
          .then(res => {
            let updatedProducts = [...this.state.products].filter(i => i.id !== id);
            this.setState({products: updatedProducts});
          });
      }


    getProducts() {
        axios.get('http://localhost:9022/products/getAll')
            .then(res => {
                this.setState({ products: res.data });
                console.log(this.state.products);
            });
    }

    onSearchInputChange = (event) => {
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getProducts()
    }

    render() {
        const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
        const { classes } = this.props;
        return (
            <div>
                {this.state.products ? (
                    <div>
                        <TextField style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for products"
                            margin="normal"
                            onChange={this.onSearchInputChange} />
                            <Grid container spacing={24}>
                            <Grid item xs>
                            <div className="row">
                         {this.state.products.map(currentProduct => (
                            <div key={currentProduct.id} className="col-md-4">
                                <Card>
                                <CardHeader
                                  action={
                                    <IconButton aria-label="More"
                                    aria-owns={open ? 'long-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}>
                                      <MoreVertIcon />
                                      <Menu
                                  id="long-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={this.handleClose}
                                  PaperProps={{
                                    style: {
                                      maxHeight: ITEM_HEIGHT * 4.5,
                                      width: 100,
                                    },
                                  }}
                                >
                                 <MenuItem onClick={() => this.edit(currentProduct.id)}>Edit
                                 </MenuItem>
                                 <MenuItem onClick={() => this.delete(currentProduct.id)}>Delete
                                 </MenuItem>
                                     {/* <option onClick={() => this.edit(currentProduct.id)}>Edit</option>
                                     <option onClick={() => this.delete(currentProduct.id)}>Delete</option> */}

                                </Menu>
                                    </IconButton>
                                  }
                                  title= {currentProduct.title}
                                />

                                <CardContent>
                                  <Typography component="p">
                                   {currentProduct.id}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </div>
                          ))}
                        </div>
                            </Grid>
                            
                            </Grid>
        
                            
                    </div>
                ) : "No products found"}
            </div>
        )
    }
}

export default  withStyles(styles)(Products);