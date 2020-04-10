from aiohttp import web
import aiohttp
import json
from config import cors, routes
from handlers import stations, default

    

app = web.Application()
routes.setup_routes(app)
cors.setup_cors(app)

web.run_app(app)