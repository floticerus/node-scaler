const path = require( 'path' )

const logger = require( path.join( __dirname, 'logger' ) )

const { EventEmitter } = require( 'events' )

const NodeScaler = require( path.join( __dirname, 'NodeScaler' ) )

class NodeScalerClient extends EventEmitter
{
    constructor( options )
    {
        super()

        options = Object.assign(
            {
                id: null
            },

            options || {}
        )

        this.id = options.id || NodeScaler.id.generate()

        this.pulse()
    }

    pulse()
    {
        this.heartbeat = Date.now() / 1000

        // console.log( this.heartbeat )
    }
}

module.exports = NodeScalerClient
