all:
	gcc relay_arp.c -o arp_spoof -w -lpcap -lpthread

clean:
	rm arp_spoof
	rm *.txt
