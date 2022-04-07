import { React, PureComponent } from 'react';
import axios from 'axios';
import Header from '../Header';
import ServerCard from '../cards/ServerCard';
import ConnectionCard from '../cards/ConnectionCard';
import XcashCard from '../cards/XcashCard';
import ConnectionsCard from '../cards/ConnectionsCard';

class XcashContainer extends PureComponent {
    tickTime = 60000;
    constructor(props) {
        super(props);

        this.xcashInterval = null;
        this.tickInterval = null;
        this.connectionsInterval = null;
        this.state = {
            xcashInfo: {},
            xversionInfo: {},
			rewardInfo: {},
			bcsize: {},
            tick: this.tickTime,
            connections: []
        };
    }

    componentDidMount() {
        this.getConnections();
        this.getXcash();
        this.getXversion();
		this.getReward();
		this.getBCsize();

        //start the overall timer
        //this.tickInterval = setInterval(this.tick, 1000);

        // Start the xcash timer
        this.xcashInterval = setInterval(this.getXcash, this.getXversion, this.getReward, this.getBCsize, this.tickTime);

        //start the connections timer
        this.connectionsInterval = setInterval(this.getConnections, this.tickTime);
    }

    componentWillUnmount() {
        // clear the interval timer
        clearInterval(this.xcashInterval);
        clearInterval(this.tickInterval);
        clearInterval(this.connectionsInterval);
    }

    //refresh timer for display
    tick = () => {
        const next = this.state.tick - 1000;
        if (this.state.tick > 0) {
            this.setState({ tick: next });
        } else {
            this.setState({ tick: this.tickTime });
        }
    };

    /**
     * gets data from the get_info endpoint
     */
    getXcash = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: '/api/get_info'
            });

            this.setState({
                xcashInfo: result.data
            });
        } catch (err) {
            console.error('Error fetching X-CASH data', err);
        }
    };
    
    /**
     * gets version via json_rpc
     */
    getXversion = async () => {
        try {
            const result = await axios.post('/api/json_rpc', {
                jsonrpc: '2.0',
                id: '0',
                method: 'get_version'
            });

            this.setState({
                xversionInfo: result.data
            });
        } catch (err) {
            console.error('Error fetching X-CASH data', err);
        }
    };
	
    /**
     * gets last reward via json_rpc
     */
    getReward = async () => {
        try {
            const result = await axios.post('/api/json_rpc', {
                jsonrpc: '2.0',
                id: '0',
                method: 'get_last_block_header'
            });

            this.setState({
                rewardInfo: result.data.result.block_header
            });
        } catch (err) {
            console.error('Error fetching X-CASH data', err);
        }
    };
	
    /**
     * gets blockchain size
     */
    getBCsize = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: 'https://explorer.xcash.foundation/getblockchaindata'
            });

            this.setState({
                bcsize: result.data
            });
        } catch (err) {
            console.error('Error fetching blockchain size', err);
        }
    };
	
    /**
     * gets connections via json_rpc
     */
    getConnections = async () => {
        try {
            const result = await axios.post('/api/json_rpc', {
                jsonrpc: '2.0',
                id: '0',
                method: 'get_connections'
            });

            this.setState({
                connections: result.data.result.connections
            });
        } catch (err) {
            console.error('Error fetching X-CASH data', err);
        }
    };

    render() {
        const { xcashInfo, xversionInfo, rewardInfo, bcsize, tick, connections } = this.state;

        return (
            <div className="XcashContainer">
                <Header info={xcashInfo} xversion={xversionInfo} tick={tick} />
                <ServerCard info={xcashInfo} size={bcsize} />
                <ConnectionCard info={xcashInfo} />
                <XcashCard info={xcashInfo} reward={rewardInfo} />
                <ConnectionsCard connections={connections} />
            </div>
        );
    }
}

export default XcashContainer;
