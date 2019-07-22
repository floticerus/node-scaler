const path = require( 'path' )

const logger = require( path.join( __dirname, 'logger' ) )

const { EventEmitter } = require( 'events' )

class NodeScaler extends EventEmitter
{
	constructor( options )
	{
		super()

		options = Object.assign(
			{
				backend: null,
				frontend: null
			},

			options || {}
		)

		this.backend = options.backend
		this.frontend = options.frontend
	}

	async start()
	{
		return new Promise( async ( resolve, reject ) =>
			{
				if ( !this.backend )
				{
					return reject( new Error( 'No backend instance' ) )
				}

				if ( !this.frontend )
				{
					return reject( new Error( 'No frontend instance' ) )
				}

				try
				{
					await this.backend.start( this )
					await this.frontend.start( this )
				}

				catch( err )
				{
					return reject( err )
				}

				resolve()
			}
		)
	}

	stop()
	{

	}

	// sends data to all clients
	async broadcast( data )
	{

	}

	// sends data to a specific client pool
	async send( pool, data )
	{

	}

	async createClient()
	{
		return new Promise( async ( resolve, reject ) =>
			{
				if ( !this.backend )
				{
					return reject( new Error( 'No backend instance' ) )
				}

				let client = null

				try
				{
					client = await this.backend.createClient()
				}

				catch( err )
				{
					return reject( err )
				}

				resolve( client )
			}
		)

		

		// // find a new client id
		// return new Promise( async ( resolve, reject ) =>
		// 	{
		// 		if ( !this.backend )
		// 		{
		// 			return reject( new Error( 'No backend instance' ) )
		// 		}

		// 		this.backend.createClient()
		// 			.then( client => resolve( client ) )
		// 			.catch( err => reject( err ) )
		// 	}
		// )
	}

	join( client, pool )
	{

	}

	leave( client, pool )
	{

	}
}

module.exports = NodeScaler

NodeScaler.id = require( 'shortid' )
NodeScaler.Client = require( path.join( __dirname, 'NodeScaler.Client' ) )
NodeScaler.Protocol = require( path.join( __dirname, 'NodeScaler.Protocol' ) )

// tcp - unsecure
NodeScaler.Protocol.TCP = require( path.join( __dirname, 'NodeScaler.Protocol.TCP' ) )

// tls - secure tcp
NodeScaler.Protocol.TLS = require( path.join( __dirname, 'NodeScaler.Protocol.TLS' ) )

// udp - unsecure
NodeScaler.Protocol.UDP = require( path.join( __dirname, 'NodeScaler.Protocol.UDP' ) )

// ws - unsecure websockets
NodeScaler.Protocol.WS = require( path.join( __dirname, 'NodeScaler.Protocol.WS' ) )

// wss - secure websockets
NodeScaler.Protocol.WSS = require( path.join( __dirname, 'NodeScaler.Protocol.WSS' ) )

// NodeScaler.Protocol = path.join( __dirname, 'NodeScaler.Protocol' )
// NodeScaler.Backend = path.join( __dirname, 'NodeScaler.Backend' )
