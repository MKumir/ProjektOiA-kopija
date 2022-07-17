# Projektne faze
- [x] - Opis projekta
- [ ] - Početna struktura aplikacije
- [ ] - Prototip
- [ ] - Konzultacije
- [ ] - Finalna verzija
- [ ] - Obrana projekta

## Opis projekta
Potrebno je napisati kratki opis projekta.
Opis mora sadržavati popis funkcionalnosti koje će biti implementirane (npr. "prijava korisnika", "unos novih poruka", "pretraživanje poruka po autoru" itd...)
Napraviti ću aplikaciju za praćenje osobnih prihoda i rashoda. Kroz aplikaciju će se moći ...

## Početna struktura aplikacije
Potrebno je inicijalizirati početnu strukturu backend i frontend aplikacija.
Aplikacije moraju biti u odvojenim mapama koje su već inicijalizirane.
Ukoliko radite aplikaciju sa statičkim frontend sadržajem, onda u mapi mora biti izvorni kôd aplikacije

## Prototip
U ovoj fazi bi trebali imati "grubu" verziju svoje aplikacije. Ova verzija bi trebala imati implementirane osnovne funkcionalnosti koje su navedene u opisu projekta. Ne očekuje se da su implementirane SVE funkcionalnosti niti da su postojeće funkcionalnosti potpuno ispravne.

## Konzultacije
Nakon izrade prototipa potrebno se javiti nastavniku za termin konzultacija. Na konzultacijama ćete ukratko pokazati svoj prototip te će se po potrebi napraviti modifikacija početnih zahtjeva. Dovršeni projekti bez ove faze neće biti prihvaćeni.

## Finalna verzija
Nakon demonstracije prototipa možete nastaviti sa razvojem aplikacije i implementacijom svih funkcionalnosti. Prilikom razvoja potrebno je voditi dnevnik aktivnosti prema zadanim uputama.

## Obrana projekta
Zadnja faza je obrana projekta - nakon završetka finalne verzije svoje aplikacije javite se nastavniku za dogovor oko termina obrane projekta.

# Opis projekta
## Kratki opis
Tema ovog projekta je skladište. Aplikacija će korisniku služiti za vođenje evidencije o isporukama u skladištu. Korisnik se može prijaviti u sustav putem postojećeg korisničkog računa. Imaju 3 razine prijave u sustav, odnosno postoje 3 tipa korisnika, admin, radnik i poslovođa. Admin ima pregled u korisničke račune, te ima mogućnost modificiranja korisničkih računa. Radnik ima uvid u isporuke te ih može evidentirati ukoliko su pristigle u skladište, dok poslovođa ima mogućnost brisanja starih i dodavanja ili uređivanja nadolazećih isporuka.
Također, moguće je sortiranje isporuka po sektoru skladišta.

## Tehnologije
1. Frontend - React
2. Backend - Express
3. Baza - Mongo
## Popis funkcionalnosti
1. Autentikacija i autorizacija korisnika
2. Dodavanje, uređivanje i brisanje korisničkih računa
3. Dodavanje, uređivanje, brisanje i označavanje isporuka
4. Sortiranje isporuka po sektoru

