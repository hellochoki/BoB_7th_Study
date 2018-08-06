all : send_arp

pcap_test: main.o
	g++ -g -o send_arp main.o -lpcap

main.o:
	g++ -g -c -o main.o send_arp.c

clean:
	rm -f send_arp
	rm -f *.o

