import spidev

### CODE TAKEN FROM https://www.raspberrypi-spy.co.uk/2013/10/analogue-sensors-on-the-raspberry-pi-using-an-mcp3008 ###


class lightsensor:

    def __init__(self, light_channel):
        self.light_channel = light_channel
        # Open SPI bus
        self.spi = spidev.SpiDev()
        self.spi.open(0, 0)
        self.spi.max_speed_hz = 1000000

    # Function to read SPI data from MCP3008 chip
    # Channel must be an integer 0-7
    def ReadChannel(self):
        adc = self.spi.xfer2([1, (8+self.light_channel) << 4, 0])
        data = ((adc[1] & 3) << 8) + adc[2]
        return data

    # Function to convert data to voltage level,
    # rounded to specified number of decimal places.
    def ConvertVolts(self, data, places):
        volts = (data * 3.3) / float(1023)
        volts = round(volts, places)
        return volts
