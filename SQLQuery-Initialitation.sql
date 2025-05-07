USE EcommerceSportTravelDB;

/* Inserimento Città per le squadre di serie A */
INSERT INTO [dbo].[Citta] (Id, Nome, Regione, DescrizioneTuristica, ImmagineUrl)
VALUES 
('5920DDE9-F3EC-4EE8-B91F-DAFCC12C33C6', 'Bergamo', 'Lombardia', 'Città storica con mura veneziane, famosa per l’Atalanta', 'https://tourismmedia.italia.it/is/image/mitur/20210302102707-bergamo-shutterstock-1108783229?wid=1600&hei=900&fit=constrain,1&fmt=webp'),
('0DD695EB-283F-449F-ABC9-26B7D1859C85', 'Bologna', 'Emilia-Romagna', 'Centro culturale e universitario con torri medievali e portici', 'https://images.winalist.com/blog/wp-content/uploads/2024/09/24130439/shutterstock_2438806991-1500x1000.jpg'),
('5EB6DC34-BFCB-47BD-9720-4989D593D404', 'Cagliari', 'Sardegna', 'Capoluogo della Sardegna, con spiagge e rovine romane', 'https://www.cagliarimag.com/wp-content/uploads/2019/11/cosa-vedere-cagliari-1170x780.jpg'),
('B5313AA0-863E-4D96-8307-F17665EF52C3', 'Como', 'Lombardia', 'Città sul lago omonimo, famosa per ville e paesaggi mozzafiato', 'https://www.regione.lombardia.it/wps/wcm/connect/05cab3d5-87b8-4f99-a036-6453157c7c42/ASSET+SOCIAL_Scopri+la+Lombardia_Como.jpg?MOD=AJPERES'),
('D4B19163-6B1C-4BF3-8B7D-CA3B70D40641', 'Empoli', 'Toscana', 'Cittadina toscana in provincia di Firenze', 'https://www.visitempoli.it/wp-content/uploads/elementor/thumbs/centro_storico_drone_628x500-pl64ng35rm9z9wcb8jzmlqtg1bwvsggxpohf7lfmdc.png'),
('92254185-D6B3-4168-A414-D8582E7E0365', 'Firenze', 'Toscana', 'Culla del Rinascimento, ricca di arte e cultura', 'https://www.toscana.info/wp-content/uploads/sites/123/firenze-hd.jpg'),
('CC4B384A-6348-43CA-83D9-6FB6A0B39F17', 'Genova', 'Liguria', 'Porto storico e città natale di Cristoforo Colombo', 'https://blog.italotreno.com/wp-content/uploads/2022/01/Porto-Genova-iStock-1179588168-1140x660.jpg'),
('32239877-7B64-45C5-83F1-56715BBAACEC', 'Verona', 'Veneto', 'Famosa per l’Arena e la storia di Romeo e Giulietta', 'https://images.winalist.com/blog/wp-content/uploads/2024/09/25073005/shutterstock_2300991451-1500x1001.jpg'),
('0EEF15C6-DE13-4CFE-86EB-7BDDF8D30359', 'Milano', 'Lombardia', 'Capitale economica italiana e sede di Inter e Milan', 'https://www.lombardia.info/wp-content/uploads/sites/112/milano-piazza-del-duomo-hd.jpg'),
('058AA5D4-5FA3-4E9F-9B3B-366F6EB3D92A', 'Torino', 'Piemonte', 'Città elegante con monumenti barocchi e sede della Juventus e del Torino', 'https://images.winalist.com/blog/wp-content/uploads/2024/07/23144116/AdobeStock_95111188-1500x1000.jpeg'),
('FF4CE665-3364-4E54-9C38-53ABAAD11BC2', 'Roma', 'Lazio', 'Capitale d’Italia, città eterna con storia millenaria', 'https://tourismmedia.italia.it/is/image/mitur/20220127150143-colosseo-roma-lazio-shutterstock-756032350?wid=1600&hei=900&fit=constrain,1&fmt=webp'),
('607B46A3-BB6E-4936-B3A2-30070B666CA1', 'Lecce', 'Puglia', 'Nota per il barocco leccese, chiamata la Firenze del Sud', 'https://static2-viaggi.corriereobjects.it/wp-content/uploads/2015/06/lecce-piazza-duomo-iStock-1080x688.jpg?v=1686667104'),
('0A63ECC6-13EE-4F2E-8B05-B1192B76882C', 'Monza', 'Lombardia', 'Nota per l’autodromo e il parco reale', 'https://d5rzfs5ck83rq.cloudfront.net/wp-content/uploads/2022/05/21132547/monza-3.jpg'),
('2B56D75E-1B34-48C0-8F8D-68AA8AC7DFB2', 'Napoli', 'Campania', 'Sul golfo, nota per pizza, Vesuvio e storia greco-romana', 'https://images.winalist.com/blog/wp-content/uploads/2024/07/23143736/AdobeStock_167806246-1500x1000.jpeg'),
('DC77DBCF-A6B5-4BBE-8C95-384316BC8651', 'Parma', 'Emilia-Romagna', 'Rinomata per gastronomia e architettura rinascimentale', 'https://image-tc.galaxy.tf/wijpeg-efigljfohqzxqcms35pqa7v3s/magazine-detail-page-it_og-image.jpg'),
('A3A3EBA6-1A81-494B-870D-AF338FF0492D', 'Udine', 'Friuli-Venezia Giulia', 'Centro culturale e commerciale del Friuli', 'https://static.wixstatic.com/media/ff2610_737461cef30743a1bfb8a1bcabf5c038~mv2.jpg/v1/fill/w_980,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ff2610_737461cef30743a1bfb8a1bcabf5c038~mv2.jpg'),
('921CDC04-EEAE-47FE-B1BB-519047894D19', 'Venezia', 'Veneto', 'Città unica al mondo, costruita sull’acqua e patrimonio UNESCO', 'https://day-trips-slovenia.com/wp-content/uploads/Rialto-bridge.webp');

/* Inserimento squadre di Serie A */
INSERT INTO [dbo].[Squadre] (Id, Nome, LogoUrl, Stadio, ColoreMaglia, CittaId)
VALUES
('CD532A46-756D-4723-BC7F-48DBDCEECF5C', 'Atalanta', 'https://img.legaseriea.it/vimages/62cfd69d/atalanta.png?webp&q=70&size=-x319.5', 'Gewiss Stadium', 'Nerazzurro', '5920DDE9-F3EC-4EE8-B91F-DAFCC12C33C6'),
('B70452A2-2C6F-4915-ADDA-0B75F330801B', 'Bologna', 'https://img.legaseriea.it/vimages/62cef3f6/bologna.png?webp&q=70&size=-x319.5', 'Stadio Renato Dall’Ara', 'Rossoblù', '0DD695EB-283F-449F-ABC9-26B7D1859C85'),
('B2079C07-9A45-4CD6-AC99-219AF92FBF80', 'Cagliari', 'https://img.legaseriea.it/vimages/62cfd202/cagliari.png?webp&q=70&size=-x319.5', 'Unipol Domus', 'Rossoblù', '5EB6DC34-BFCB-47BD-9720-4989D593D404'),
('260C9490-35B0-4EB5-9A63-927D4D78E064', 'Como', 'https://img.legaseriea.it/vimages/62e2854f/como-n.png?webp&q=70&size=300x-', 'Stadio Giuseppe Sinigaglia', 'Blu', 'B5313AA0-863E-4D96-8307-F17665EF52C3'),
('8EF876DF-587F-483B-8C22-44DCD9387888', 'Empoli', 'https://img.legaseriea.it/vimages/62cef42e/empoli.png?webp&q=70&size=300x-', 'Stadio Carlo Castellani', 'Azzurro', 'D4B19163-6B1C-4BF3-8B7D-CA3B70D40641'),
('2CABC947-7DA5-42A2-882A-5BC4809A723C', 'Fiorentina', 'https://img.legaseriea.it/vimages/62cef452/fiorentina.png?webp&q=70&size=300x-', 'Stadio Artemio Franchi', 'Viola', '92254185-D6B3-4168-A414-D8582E7E0365'),
('A101868E-E436-45E7-BB30-6789A0BEA680', 'Genoa', 'https://img.legaseriea.it/vimages/649e8a06/GENOA-1.png?webp&q=70&size=300x-', 'Stadio Luigi Ferraris', 'Rossoblù', 'CC4B384A-6348-43CA-83D9-6FB6A0B39F17'),
('CEDE3B27-8E11-4E39-AC87-8E95A05D5BB8', 'Hellas Verona', 'https://img.legaseriea.it/vimages/62cef475/colore=YELLOW.png?webp&q=70&size=300x-', 'Stadio Marcantonio Bentegodi', 'Gialloblù', '32239877-7B64-45C5-83F1-56715BBAACEC'),
('476287EF-DFE3-4615-8CFE-8EE49EBFE3BA', 'Inter', 'https://img.legaseriea.it/vimages/62cef496/inter.png?webp&q=70&size=300x-', 'Stadio San Siro', 'Nerazzurro', '0EEF15C6-DE13-4CFE-86EB-7BDDF8D30359'),
('04063D50-2881-417E-996D-E1B2662F44E0', 'Juventus', 'https://img.legaseriea.it/vimages/62cef4b7/colore=WHITE.png?webp&q=70&size=300x-', 'Allianz Stadium', 'Bianconero', '058AA5D4-5FA3-4E9F-9B3B-366F6EB3D92A'),
('00D82887-C889-43A7-B61A-3DF4383BA036', 'Lazio', 'https://img.legaseriea.it/vimages/62cef4d5/lazio.png?webp&q=70&size=300x-', 'Stadio Olimpico', 'Biancoceleste', 'FF4CE665-3364-4E54-9C38-53ABAAD11BC2'),
('729893C9-8F6B-491A-AB45-F831CF83C0EC', 'Lecce', 'https://img.legaseriea.it/vimages/62cef4f6/lecce.png?webp&q=70&size=300x-', 'Stadio Via del Mare', 'Giallorosso', '607B46A3-BB6E-4936-B3A2-30070B666CA1'),
('8DD146F6-15C2-43AC-88DA-E84E2F0B1F88', 'Milan', 'https://img.legaseriea.it/vimages/62cef513/milan.png?webp&q=70&size=300x-', 'Stadio San Siro', 'Rossonero', '0EEF15C6-DE13-4CFE-86EB-7BDDF8D30359'),
('88CC1723-4D7E-485D-8155-4F0A38EBF832', 'Monza', 'https://img.legaseriea.it/vimages/62c6acbd/monza.png?webp&q=70&size=300x-', 'U-Power Stadium', 'Biancorosso', '0A63ECC6-13EE-4F2E-8B05-B1192B76882C'),
('D18F63A1-B0F9-44C1-B0FA-D86B6F25DB23', 'Napoli', 'https://img.legaseriea.it/vimages/6681d3ab/White.png?webp&q=70&size=300x-', 'Stadio Diego Armando Maradona', 'Azzurro', '2B56D75E-1B34-48C0-8F8D-68AA8AC7DFB2'),
('46D78438-E597-4912-AFF8-C15CB07E8AFC', 'Parma', 'https://img.legaseriea.it/vimages/632da7d1/parmalogo.png?webp&q=70&size=300x-', 'Stadio Ennio Tardini', 'Gialloblù', 'DC77DBCF-A6B5-4BBE-8C95-384316BC8651'),
('042F44B1-89A6-4C7A-A780-6904F0ABA64A', 'Roma', 'https://img.legaseriea.it/vimages/62cfd5ce/roma.png?webp&q=70&size=300x-', 'Stadio Olimpico', 'Giallorosso', 'FF4CE665-3364-4E54-9C38-53ABAAD11BC2'),
('5DEB9F64-1116-4AC4-9FF0-90ED0F0F4E49', 'Torino', 'https://img.legaseriea.it/vimages/62cef5cb/torino.png?webp&q=70&size=300x-', 'Stadio Olimpico Grande Torino', 'Granata', '058AA5D4-5FA3-4E9F-9B3B-366F6EB3D92A'),
('3F791CCF-EBCB-49CA-A561-BFD5B28071BE', 'Udinese', 'https://img.legaseriea.it/vimages/62cef5e9/udinese.png?webp&q=70&size=300x-', 'Bluenergy Stadium', 'Bianconero', 'A3A3EBA6-1A81-494B-870D-AF338FF0492D'),
('936D9DC6-4AF0-401D-AD9C-53E1FF070EBF', 'Venezia', 'https://img.legaseriea.it/vimages/64c7b5fd/Logo-Venezia.png?webp&q=70&size=300x-', 'Stadio Pierluigi Penzo', 'Arancioneroverde', '921CDC04-EEAE-47FE-B1BB-519047894D19');

/* 34esima */
INSERT INTO dbo.Partite (Id, DataPartita, SquadraCasaId, SquadraOspiteId, CittaId, Stadio, Campionato)
VALUES
-- Atalanta vs Lecce
(NEWID(), '2025-04-25 20:45:00', 'CD532A46-756D-4723-BC7F-48DBDCEECF5C', '729893C9-8F6B-491A-AB45-F831CF83C0EC', '5920DDE9-F3EC-4EE8-B91F-DAFCC12C33C6', 'Gewiss Stadium', 'Serie A'),
-- Como vs Genoa
(NEWID(), '2025-04-26 15:00:00', '260C9490-35B0-4EB5-9A63-927D4D78E064', 'A101868E-E436-45E7-BB30-6789A0BEA680', 'B5313AA0-863E-4D96-8307-F17665EF52C3', 'Stadio Giuseppe Sinigaglia', 'Serie A'),
-- Inter vs Roma
(NEWID(), '2025-04-26 18:00:00', '476287EF-DFE3-4615-8CFE-8EE49EBFE3BA', '042F44B1-89A6-4C7A-A780-6904F0ABA64A', '0EEF15C6-DE13-4CFE-86EB-7BDDF8D30359', 'Stadio San Siro', 'Serie A'),
-- Lazio vs Parma
(NEWID(), '2025-04-26 20:45:00', '00D82887-C889-43A7-B61A-3DF4383BA036', '46D78438-E597-4912-AFF8-C15CB07E8AFC', 'FF4CE665-3364-4E54-9C38-53ABAAD11BC2', 'Stadio Olimpico', 'Serie A'),
-- Venezia vs Milan
(NEWID(), '2025-04-27 12:30:00', '936D9DC6-4AF0-401D-AD9C-53E1FF070EBF', '8DD146F6-15C2-43AC-88DA-E84E2F0B1F88', '921CDC04-EEAE-47FE-B1BB-519047894D19', 'Stadio Pierluigi Penzo', 'Serie A'),
-- Fiorentina vs Empoli
(NEWID(), '2025-04-27 15:00:00', '2CABC947-7DA5-42A2-882A-5BC4809A723C', '8EF876DF-587F-483B-8C22-44DCD9387888', '92254185-D6B3-4168-A414-D8582E7E0365', 'Stadio Artemio Franchi', 'Serie A'),
-- Juventus vs Monza
(NEWID(), '2025-04-27 18:00:00', '04063D50-2881-417E-996D-E1B2662F44E0', '88CC1723-4D7E-485D-8155-4F0A38EBF832', '058AA5D4-5FA3-4E9F-9B3B-366F6EB3D92A', 'Allianz Stadium', 'Serie A'),
-- Napoli vs Torino
(NEWID(), '2025-04-27 20:45:00', 'D18F63A1-B0F9-44C1-B0FA-D86B6F25DB23', '5DEB9F64-1116-4AC4-9FF0-90ED0F0F4E49', '2B56D75E-1B34-48C0-8F8D-68AA8AC7DFB2', 'Stadio Diego Armando Maradona', 'Serie A'),
-- Udinese vs Bologna
(NEWID(), '2025-04-28 18:30:00', '3F791CCF-EBCB-49CA-A561-BFD5B28071BE', 'B70452A2-2C6F-4915-ADDA-0B75F330801B', 'A3A3EBA6-1A81-494B-870D-AF338FF0492D', 'Bluenergy Stadium', 'Serie A'),
-- Hellas Verona vs Cagliari
(NEWID(), '2025-04-28 20:45:00', 'CEDE3B27-8E11-4E39-AC87-8E95A05D5BB8', 'B2079C07-9A45-4CD6-AC99-219AF92FBF80', '32239877-7B64-45C5-83F1-56715BBAACEC', 'Stadio Marcantonio Bentegodi', 'Serie A');

-- Pacchetti Viaggio 34ª giornata
INSERT INTO dbo.PacchettiViaggio (Id, Titolo, Descrizione, Prezzo, ImmagineUrl, Durata, Disponibile, PartitaId, CittaId)
VALUES
-- Atalanta vs Lecce
(NEWID(), 'Bergamo in Goal: Atalanta vs Lecce', 'Tour gastronomico e sportivo con biglietto Gewiss Stadium', 249.99, 'https://cdn.getyourguide.com/img/tour/5e7b3c2f6d678.jpeg/146.jpg', 3, 1, '36F14119-D7C6-4D50-9E94-7323026881BD', '5920DDE9-F3EC-4EE8-B91F-DAFCC12C33C6'),
-- Como vs Genoa
(NEWID(), 'Lago e Calcio: Como vs Genoa', 'Pacchetto di viaggio sul Lago di Como con accesso alla partita Como vs Genoa', 219.99, 'https://www.lombardiafacile.regione.lombardia.it/wps/wcm/connect/4def2e43-e867-4eef-a96a-6689cf3837a3/Varenna%2Blago%2Bdi%2BComo_02.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-4def2e43-e867-4eef-a96a-6689cf3837a3-my56v.x', 3, 1, '5AA22B7E-6235-4CA8-AB7E-08D32EF0F6EE', 'B5313AA0-863E-4D96-8307-F17665EF52C3'),
-- Inter vs Roma
(NEWID(), 'Il Serpente incontra la Lupa: Inter vs Roma', '3 giorni a Milano con visita a San Siro per il match Inter vs Roma', 289.99, 'https://images.daznservices.com/di/library/DAZN_News/96/e3/stadio-giuseppe-meazza-san-siro-milano_4cjhdeivtnwd1bxs8zd6t4szz.jpg?t=1419005952', 3, 1, 'D33DE915-B745-4C01-B58C-9F4AB25F9A81', '0EEF15C6-DE13-4CFE-86EB-7BDDF8D30359'),
-- Lazio vs Parma
(NEWID(), 'Roma Capitale: Lazio vs Parma', 'Esplora la capitale con esperienza VIP alla partita Lazio vs Parma', 259.99, 'https://www.turismoroma.it/sites/default/files/Roma%20in%20breve.jpg', 5, 1, '1A3A485A-6DB8-4823-BB90-F239A4F79B19', 'FF4CE665-3364-4E54-9C38-53ABAAD11BC2'),
-- Venezia vs Milan
(NEWID(), 'Canali e Calcio: Venezia vs Milan', 'Viaggio romantico a Venezia con match Venezia vs Milan incluso', 399.99, 'https://venice-box.com/wp-content/uploads/2019/05/venezia-romantica.jpg', 5, 1, '72967ECD-8B6F-4EDE-82B8-4908BB6D86F0', '921CDC04-EEAE-47FE-B1BB-519047894D19'),
-- Fiorentina vs Empoli
(NEWID(), 'Firenze e Derby toscano', 'Scopri Firenze e assisti al derby Fiorentina vs Empoli', 239.99, 'https://www.visittuscany.com/shared/visittuscany/immagini/duomo-firenze-ok.jpg?__scale=w:1920,h:1000,t:2,q:85', 7, 1, '5EAD33F4-EA3E-4D70-A370-DD4D60F0F098', '92254185-D6B3-4168-A414-D8582E7E0365'),
-- Juventus vs Monza
(NEWID(), 'Torino tra sport e cultura', 'Weekend a Torino con biglietto per Juventus vs Monza', 279.99, 'https://www.exclusivebrandstorino.com/wp-content/uploads/2023/04/centro-storico-di-torino-un-gioiello-da-scoprire-exclusive-brands-torino-cover-image-6.webp', 3, 1, 'CCC9AABF-A145-4404-AA9C-8E1AFDE85DCC', '058AA5D4-5FA3-4E9F-9B3B-366F6EB3D92A'),
-- Napoli vs Torino
(NEWID(), 'Partenope Calcio Tour', 'Tour di Napoli con degustazione e partita Napoli vs Torino', 269.99, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0e/80/41/09.jpg', 5, 1, 'D54A2A50-A8A0-4A17-9FA3-72952E763550', '2B56D75E-1B34-48C0-8F8D-68AA8AC7DFB2'),
-- Udinese vs Bologna
(NEWID(), 'Friuli in festa: Udinese vs Bologna', 'Pacchetto culturale in Friuli con accesso alla partita', 219.99, 'https://www.laureaturismo.it/wp-content/uploads/2015/12/Corso-di-Laurea-in-Conservazione-dei-Beni-Culturali-Udine-820x479.jpg', 3, 1, 'D0EE740A-7242-4BD7-B26D-6FA315197953', 'A3A3EBA6-1A81-494B-870D-AF338FF0492D'),
-- Hellas Verona vs Cagliari
(NEWID(), 'Arena di Calcio: Verona vs Cagliari', 'Scopri Verona e goditi la sfida con il Cagliari', 239.99, 'https://agriturismo.life/image.php/image.jpg?width=750&height=456&cropratio=750:456&image=/uploads/blog/adobestock-303701377.jpg', 3, 1, 'BFA41B24-102E-4585-B9D3-74D141386DE2', '32239877-7B64-45C5-83F1-56715BBAACEC');

 SELECT Id, DataPartita FROM dbo.Partite WHERE DataPartita BETWEEN '2025-04-25' AND '2025-04-29';