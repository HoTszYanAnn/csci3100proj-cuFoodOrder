import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Cookies from "js-cookie";

const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    menuItem: {
        fontSize: '1.4rem'
    }
});

class RestaurantCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            login: false,
        }
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick = () => {
        console.log(this.state.expanded);
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { classes } = this.props;
        console.log(this.props);
        if (Cookies.get("username") && !this.state.login){
            this.setState({login:true})
        }

        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {this.props.restaurant.user[0].name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={sessionStorage.setItem('restName', JSON.stringify(this.props.restaurant.user[0].username))} component={RouterLink} to={{ pathname: `/restaurants/${this.props.restaurant.user[0].username}` }}>
                            <RestaurantIcon />
                        </IconButton>
                    }
                    title={this.props.restaurant.user[0].name}
                />
                <CardMedia
                    className={classes.media}
                    image={this.props.restaurant.user[0].image}
                    title={this.props.restaurant.user[0].name}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.restaurant.user[0].introduction}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" disabled={!this.state.login}  onClick={() => this.props.plusOne(this.props.restaurant._id.restaurantName)}>
                        <FavoriteIcon style={{ color: this.state.login ? 'pink': 'grey'}} />
                        <div>{this.props.restaurant.user[0].likes}</div>
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container>
                        <Grid item xs={12} className={classes.menuItem}>Menu:</Grid>
                        {this.props.restaurant.menu.map((menu, index) =>
                            <Grid container justify="space-between" key={index}>
                                <Grid item xs= {12}className={classes.menuItem} style={{marginTop: '1rem', borderBottom:'solid 1px black'}}>{menu.menuName}</Grid>
                                {menu.menuList.map((item, index) =>
                                    <Grid item container key={index}>
                                        <Grid item xs={8} className={classes.menuItem}>{item.dish}</Grid>
                                        <Grid item xs={4} style={{testAlign:'right'}} className={classes.menuItem}>HK${item.price}</Grid>
                                    </Grid>
                                )}
                            </Grid>
                            )}
                            </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

RestaurantCard.propTypes = {
                    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RestaurantCard);