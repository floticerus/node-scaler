const path = require( 'path' )

const NodeScaler = require( path.join( __dirname, '../', '../' ) )

const NodeScalerRedis = require( path.join( __dirname, 'NodeScaler.Protocol.Redis' ) )

const backend = new NodeScalerRedis(
    {

    }
)

const nodeScaler = new NodeScaler(
    {
        backend: backend
    }
)

;( async () =>
    {
        await nodeScaler.start()

        console.log ( nodeScaler )
    }
)();
