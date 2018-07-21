#include <pcap.h>
#include <stdio.h>

void usage() {
  printf("syntax: pcap_test <interface>\n");
  printf("sample: pcap_test wlan0\n");
}

int main(int argc, char* argv[]) {

  
  u_char pac[1000] = { 0 };

  if (argc != 2) {
    usage();
    return -1;
  }

  char* dev = argv[1];
  char errbuf[PCAP_ERRBUF_SIZE];
  pcap_t* handle = pcap_open_live(dev, BUFSIZ, 1, 1000, errbuf);
  if (handle == NULL) {
    fprintf(stderr, "couldn't open device %s: %s\n", dev, errbuf);
    return -1;
  }

  while (true) {
    struct pcap_pkthdr* header;
    const u_char* packet;
    int res = pcap_next_ex(handle, &header, &packet);
    if (res == 0) continue;
    if (res == -1 || res == -2){ printf("\nEND\n"); break; }
  
  for(int i = 0; i < header -> caplen; i++ ){
  
  	pac[i] = packet[i];
  }
  
  if(header -> caplen >= 14){
 
  printf("Eth Source = %0.2x:%0.2x:%0.2x:%0.2x:%0.2x:%0.2x \n",pac[6],pac[7],pac[8],pac[9],pac[10],pac[11]);
  printf("Eth Destination = %0.2x:%0.2x:%0.2x:%0.2x:%0.2x:%0.2x \n",pac[0],pac[1],pac[2],pac[3],pac[4],pac[5]);

    if((header -> caplen >= 34) && (pac[12] == 0x08) && (pac[13] == 0x00)){
  	
	
	printf("IP Source = %d:%d:%d:%d \n",pac[26],pac[27],pac[28],pac[29]);
	printf("IP Destination = %d:%d:%d:%d \n",pac[30],pac[31],pac[32],pac[33]);
	
	  if((header -> caplen >= 38 ) && (pac[23] == 0x06)){
	
	     int upper = pac[34];
	     int upper2 = pac[36];

	     upper = upper*16*16;
	     upper2 = upper2*16*16;

	     int latter = pac[35];
	     int latter2 = pac[37];

     	     printf("Source Port: %d\n",upper+latter);
	     printf("Destination Port: %d\n",upper2+latter2);	     
	   
	     if(header ->caplen >=70){
	 	   printf("DATA : %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x %0.2x\n",pac[54],pac[55],pac[56],pac[57],pac[58],pac[59],pac[60],pac[61],pac[62],pac[63],pac[64],pac[65],pac[66],pac[67],pac[68],pac[69]);
	     }
	  }

    }

 
 }
 printf("\n\n");
}

  pcap_close(handle);
  return 0;
}
