all:
	gcc relay_arp.c -o relay_arp -w -lpcap -lpthread

clean:
	rm relay_arp
	rm *.txt
