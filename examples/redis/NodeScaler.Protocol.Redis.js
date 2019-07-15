const path = require( 'path' )

const redis = require( 'redis' )

const NodeScaler = require( path.join( __dirname, '../', '../', 'src', 'NodeScaler' ) )

class NodeScalerProtocolRedis extends NodeScaler.Protocol
{
    constructor( options )
    {
        options = Object.assign(
            {
                clientOptions: {},
                client: null,
                error: err => {}
            },

            options || {}
        )

        super( options )

        this.clientOptions = options.clientOptions
        this.client = options.client
        // this.clients = []
        this.onError = options.error
    }

    // start connection to redis server
    async start()
    {
        // super.start()

        return new Promise( ( resolve, reject ) =>
            {
                if ( this.client )
                {
                    // client already exists
                    return resolve()
                }

                this.client = redis.createClient( this.clientOptions )

                // forward redis client error messages
                this.client.on( 'error', err => this.emit( 'error', err ) )

                // ready handler
                this.client.once( 'ready', resolve )
            }
        )
    }

    // stop connection to redis server
    async stop()
    {
        return new Promise( ( resolve, reject ) =>
            {
                if ( !this.client )
                {
                    return reject( new Error( 'No connection to Redis' ) )
                }

                this.client.end( async () =>
                    {
                        await super.stop()

                        resolve()
                    }
                )
            }
        )
    }

    // sends data to all clients
    async broadcast( data )
    {

    }

    // sends data to a specific pool of client(s)
    async send( pool, data )
    {

    }

    // handler for incoming data
    async receive( data )
    {

    }

    async createClient()
    {
        return new Promise( ( resolve, reject ) =>
            {
                if ( !this.client )
                {
                    return reject( new Error( 'No connection to redis' ) )
				}

				const id = NodeScaler.id.generate()

				// create client in redis with unique id
				this.client.hmset( id,
					{
						// timestamp
						t: Date.now()
					}
				)

                const client = new NodeScaler.Client(
                    {
						id: id
                    }
                )

                // this.clients.push( client )

                resolve( client )
            }
        )
    }

    // join a pool
    async join( client, pool )
    {

    }

    // leave a pool
    async leave( client, pool )
    {

    }
}

module.exports = NodeScalerProtocolRedis
