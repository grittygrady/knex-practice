INSERT INTO blogful_articles (title, date_published, content)
VALUES 
  ('Hello World', now() - '20 days'::INTERVAL, 'Hello world!'),
  ('Blog 2', now() - ' 19 days'::INTERVAL, 'Woohoo'),
  ('The magic number', now() - '18 days'::INTERVAL, 'De La Soul'),
  ('A boring number', now() - '18 days'::INTERVAL, 'Nothing to see here'),
  ('Johnny Five', now() - '18 days'::INTERVAL, 'Is alive!'),
  ('SixSixSix', now() - '15 days'::INTERVAL, 'Number of the beast'),
  ('The lucky number', now() - '15 days'::INTERVAL, 'Slevin'),
  ('Eight Afraid', now() - '14 days'::INTERVAL, '7 ate 9'),
  ('Number nine', now() - '13 days'::INTERVAL, 'Lennon''s favorite'),
  ('Ten', now() - '13 days'::INTERVAL, 'Halfway there'),
  ('So many titles', now() - '12 days'::INTERVAL, 'Eleven Eleven'),
  ('La la means I love you', now() - '12 days'::INTERVAL, 'Twelve is gross'),
  ('Thirteen is unlucky', now() - '11 days'::INTERVAL, 'So should B be'),
  ('Just a few more', now() - '10 days'::INTERVAL, 'Getting there'),
  ('Three quarters', now() - '10 days'::INTERVAL, 'Coin shortage'),
  ('Sixteen Saltines', now() - '9 days'::INTERVAL, 'By Jack White'),
  ('Seventeen', now() - '9 days'::INTERVAL, 'By Brian Setzer'),
  ('Eighteen', now() - '5 days'::INTERVAL, 'By Alice Cooper'),
  ('1999', now() - '4 days'::INTERVAL, 'Party like it''s'),
  ('And done', now(), 'FINALLY')
  ;
