all: sum_test


main.o: main.cpp
	g++ -c -o main.o main.cpp


sum.o: sum.cpp
	g++ -c -o sum.o sum.cpp

sum_test: main.o sum.o
	g++ -o sum_test main.o sum.o

clean:
	rm -f *.o
	rm -f sum_test

