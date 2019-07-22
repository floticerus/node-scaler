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

				ipv6Only: false,

				// in milliseconds
				heartbeatInterval: 4500,

				// in milliseconds
				heartbeatTimeout: 10000
			},

			options || {}
		)

		this.host = options.host
		this.port = parseInt( options.port )
		this.ipv6Only = options.ipv6Only ? true : false

		this.heartbeatInterval = parseInt( options.heartbeatInterval )
		this.heartbeatTimeout = parseInt( options.heartbeatTimeout )

		this.server = null

		this.clients = {}
	}

	async start( nodeScaler )
	{
		super.start( nodeScaler )

		return new Promise( ( resolve, reject ) =>
			{
				this.server = net.createServer( this.connection.bind( this ) )

				// TODO reject the promise, depending on the error
				this.server.on( 'error', err => this.emit( 'error', err ) )

				this.server.listen(
					{
						host: this.host,

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

	connection( socket )
	{
		const client = this.createClient( socket )

		logger.log( client )

		this.clients[ client.id ] = client

		// check heartbeat on an interval
		const interval = setInterval( () =>
			{
				const t = Date.now() / 1000

				// console.log( client.heartbeat )

				if ( t - client.heartbeat > this.heartbeatTimeout )
				{
					this.clients[ client.id ] = null
					delete this.clients[ client.id ]

					// console.log( 'end the socket' )

					socket.destroy()

					return clearInterval( interval )
				}

				// console.log( Date.now() )

				this.sendToClient( client, Buffer.from( '_' ) )
			},

			this.heartbeatInterval
		)

		// socket.setKeepAlive( true, 5000 )

		// heartbeat pulse
		socket.on( 'data', () => client.pulse() )

		socket.on( 'end', () =>
			{
				clearInterval( interval )
			}
		)

		socket.on( 'timeout', () => socket.end() )
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

	async sendToClient( client, data )
	{
		// TODO move this part to an override in a child class
		data = Buffer.concat(
			[
				Buffer.from( [ data.length ] ),
				Buffer.isBuffer( data ) ? data : Buffer.from( data )
			],
			
			// total length
			1 + data.length
		)

		// console.log( data )

		return new Promise( ( resolve, reject ) =>
			{
				client.socket.write( data, err => err
					? reject( err )
					: resolve()
				)
			}
		)
	}

	// handler for incoming data
	async receive( data )
	{
		return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
	}

	createClient( socket )
	{
		const client = super.createClient(
			{

			}
		)

		client.server = this
		client.socket = socket

		return client
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
