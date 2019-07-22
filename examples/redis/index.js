const path = require( 'path' )

const NodeScaler = require( path.join( __dirname, '../', '../' ) )

const NodeScalerRedis = require( path.join( __dirname, 'NodeScaler.Protocol.Redis' ) )

const nodeScaler = new NodeScaler(
    {
        backend: new NodeScalerRedis(
            {
        
            }
        ),

        frontend: new NodeScaler.Protocol.TCP(
            {
        
            }
        )
    }
)

;( async () =>
    {
        await nodeScaler.start()

        console.log ( nodeScaler )
    }
)();
