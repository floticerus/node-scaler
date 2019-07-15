const path = require( 'path' )

const logger = require( path.join( __dirname, 'logger' ) )

const { EventEmitter } = require( 'events' )

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

        this.id = options.id
    }
}

module.exports = NodeScalerClient
