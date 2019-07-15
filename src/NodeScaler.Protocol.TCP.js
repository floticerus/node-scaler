const path = require( 'path' )

const net = require( 'net' )

const logger = require( path.join( __dirname, 'logger' ) )

const NodeScaler = require( path.join( __dirname, 'NodeScaler' ) )

class NodeScalerProtocolTCP extends NodeScaler.Protocol
{
	constructor( options )
	{
		super( options )

		options = Object.assign(
			{
				host: undefined,

				port: 8000,

				ipv6Only: false
			},

			options || {}
		)

		this.host = options.host
		this.port = parseInt( options.port )
		this.ipv6Only = options.ipv6Only ? true : false

		this.server = null
	}

	async start()
	{
		return new Promise( ( resolve, reject ) =>
			{
				this.server = net.createServer( this.connection.bind( this ) )

				// TODO reject the promise, depending on the error
				this.server.on( 'error', err => this.emit( 'error', err ) )

				this.server.listen(
					{
						host: options.host,

						port: this.port,

						ipv6Only: this.ipv6Only
					},
					
					() =>
					{
						this.emit( 'listening' )

						resolve()
					}
				)
			}
		)
	}

	async stop()
	{
		return new Promise( ( resolve, reject ) =>
			{
				if ( !this.server )
				{
					return resolve()
				}

				if ( !this.server.listening )
				{
					return resolve()
				}

				this.server.close( err => err ? reject( err ) : resolve() )
			}
		)
	}

	connection( connection )
	{
		logger.log( connection )
	}

	// sends data to all clients
	async broadcast( data )
	{
		return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
	}

	// sends data to a specific pool of client(s)
	async send( pool, data )
	{
		return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
	}

	// handler for incoming data
	async receive( data )
	{
		return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
	}

	async craeteClient()
	{
		return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
	}

	async join( client, pool )
	{
		return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
	}

	async leave( client, pool )
	{
		return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
	}
}

module.exports = NodeScalerProtocolTCP
