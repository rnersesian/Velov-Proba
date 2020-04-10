from aiohttp import web
from handlers import stations, default

def setup_routes(app):
    app.add_routes([
        web.get('/', default.hello),
        web.get("/stations", stations.getStations),
        web.get("/stations/{station_name}", stations.getStationHistory),
        web.get("/last/{station_name}", stations.getLastUpdate)
    ])