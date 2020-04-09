import logging
import asyncio
from aiohttp import web
import concurrent.futures


class VelovApi():

    def __init__(self):
        self._init_log()
        self._init_loop()

    def _init_log(self):
        formatter = logging.Formatter(
            "[%(levelname)s] %(name)s: %(message)s")
        main_log = logging.getLogger('velovApi')
        main_log.setLevel(logging.DEBUG)
        log_sh = logging.StreamHandler()
        log_sh.setFormatter(formatter)
        main_log.addHandler(log_sh)
        aiohttp_log = logging.getLogger('aiohttp')
        aiohttp_log.setLevel(logging.INFO)
        self.log = logging.getLogger(__name__)

    def _init_loop(self):
            self._loop = asyncio.get_event_loop()
            self._loop.set_default_executor(
                concurrent.futures.ThreadPoolExecutor(
                    max_workers=10))