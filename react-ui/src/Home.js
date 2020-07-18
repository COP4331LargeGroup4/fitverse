import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { Img } from 'react-image';
import Logo from "./logo.svg";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
    <Container text>
        {/*<Header
            as='h1'
            //content='Fitverse'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />*/}
        <NavLink exact to="/">
            <Img src={Logo} 
            style={{ 
                maxWidth: "100%",
                marginTop: mobile ? '1.5em' : '4em',
            }} />
		</NavLink>
        <Header
            as='h2'
            content='A fitness application by group 4'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size='huge' as={NavLink} exact to="/signup" style={{backgroundColor: '#416164'}}>
            Get Started
        <Icon name='right arrow' />
        </Button>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em', backgroundColor: '#D9DBF1'}} //light purple at top
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item position='right'>
                                    <Button inverted={!fixed} as={NavLink} exact to="/signin">Log In</Button>
                                    <Button inverted={!fixed} as={NavLink} exact to="/signup" primary={fixed} style={{ marginLeft: '0.5em'}}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                {/* When the page shrinks */}
                <Sidebar
                    border="none"
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                    style = {{backgroundColor: "#416165"}}
                >
                    <Menu.Item as={NavLink} exact to="/signin">Log In</Menu.Item>
                    <Menu.Item as={NavLink} exact to="/signup">Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}> {/* when page is shrunk */}
                    <Segment
                        inverted
                        textAlign='center'
                        vertical
                        style={{ minHeight: 500, padding: '1em 0em', backgroundColor: '#D9DBF1'}} 
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as={NavLink} exact to="/signin" inverted>
                                        Log In
                                    </Button>
                                    <Button as={NavLink} exact to="/signup" inverted style={{ marginLeft: '0.5em'}}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

export const HomepageLayout = () => (
    <ResponsiveContainer>
        <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                        <Header as='h3' style={{ fontSize: '2em', paddingLeft: '0.5em'}}>
                            What Fitverse Has To Offer
                        </Header>
                        <p style={{ fontSize: '1.33em', paddingLeft: '1em' }}>
                            We provide an easy way for you to plan and log your workouts.
                            All of our exercises and workouts are fully customizable! 
                            You can even include your specific goals for each workout.
                            With our calendar feature, you can view the workouts you've planned up to months in advance.
                            
                        </p>
                        {/*<Header as='h3' style={{ fontSize: '2em' }}>
                            We Make Bananas That Can Dance
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                            bioengineered.
                        </p>*/}
                </Grid.Row>
            </Grid>
        </Segment>

        <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Download the Fitverse Mobile App Today!
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>At the gym? On a jog? No access to a computer? <br></br>The Fitverse mobile app makes tracking your workouts easy!</p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            "Wow! So easy to use!"
                    </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            ~ Anonymous, 2020 (lol)
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
                <Header as='h3' style={{ fontSize: '2em' , textAlign:"center"}}>
                    List of Features Fitverse Provides 
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                    <List style={{textAlign:"center"}}>
                        <List.Item >Daily exercise checklist</List.Item>
                        <List.Item >Calendar to add/view/edit workouts</List.Item>
                        <List.Item >Dashboard that shows your weekly calendar</List.Item>
                        <List.Item >Customizable workouts made up of your exercises</List.Item>
                    </List>
                </p>

                {/*<Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                >
                </Divider>

                <Header as='h3' style={{ fontSize: '2em' }}>
                    Did We Tell You About Our Bananas?
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                    Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                    it's really true. It took years of gene splicing and combinatory DNA research, but our
                    bananas can really dance.
                    </p>*/}
            </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em', backgroundColor:"#0B3948"}}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Creators of Fitverse' />
                            <List link inverted style={{cursor: 'arrow'}}>
                                <List.Item as='a'>Jayden Bendezu</List.Item>
                                <List.Item as='a'>Daniela Cruz Falquez</List.Item>
                                <List.Item as='a'>Muhamad Elassar</List.Item>
                                <List.Item as='a'>Joshua Kraftchick</List.Item>
                                <List.Item as='a'>Joseph Mansy</List.Item>
                                <List.Item as='a'>O'Neal Thomas</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Contact Us' />
                            <List link inverted>
                                <List.Item as='a'>Fitverse123@gmail.com</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Other' />
                            <List link inverted>
                                <List.Item as='a'>COP 4331 0001</List.Item>
                                <List.Item as='a'>Summer 2020</List.Item>
                                <List.Item as='a'>Group 4</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </ResponsiveContainer>
)

export default HomepageLayout;