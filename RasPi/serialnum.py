### CODE TAKEN FROM https://www.raspberrypi-spy.co.uk/2012/09/getting-your-raspberry-pi-serial-number-using-python/ ###

def getserial():
    # Extract serial from cpuinfo file
    cpuserial = "0000000000000000"
    f = open('/proc/cpuinfo', 'r')
    for line in f:
      if line[0:6] == 'Serial':
        cpuserial = line[10:26]
    f.close()
    return cpuserial
