import React from 'react';
import {StyleSheet} from 'react-native';
// import {useTranslation} from 'react-i18next';

import {Container, TermsContainer} from './styles';

import Paragraph from '../../components/Paragraph';
import HeaderWithLogo from '../../components/HeaderWithLogo';
import HeaderWithMenu from '../../components/HeaderWithMenu';

const Terms = () => {
  // const {t} = useTranslation('terms');
  const t = field => {
    let fieldName = field.split('.');
    let strings = {
      "title": "Política de Privacidade",
      "subtitle": "Este website é operado pela Good Casting, nome de fantasia.",
      "important": "Importante: ao fornecer dados pessoais à Good Casting e/ou através da website da Good Casting o utilizador autoriza que os seus dados pessoais sejam utilizados tratados pela Good Casting nos termos e condições abaixo descritos.",
      "first": "1. Âmbito",
      "firstContent": {
        "1_1": "1.1 Esta Política de Privacidade abrange a plataforma digital do website Good Casting.",
        "1_2": "A Good Casting está acessível através de website disponível na internet com o endereço www.goodcasting.pt",
      },
      "second": "2. Advertência",
      "secondContent": "A navegação, registo e uso da plataforma Good Casting está pendente da aceitação das condições previstas nesta política. Caso não concorde com a mesma, deve abandonar o website.",
      "third": "3. Política de Privacidade e Segurança",
      "thirdContent": {
        "3_1": "3.1 A Good Casting preocupa-se com a sua privacidade e protege as informações que lhe forem transmitidas.",
        "3_2": "3.2 A Good Casting estabelece consigo o cumprimento dos princípios da legislação e proteção de dados, respeitando todas as leis e normas nacionais.",
        "3_3": "3.3 A Good Casting não é responsável perante quaisquer utilizadores deste website por quaisquer danos decorrentes da utilização ou divulgação das informações nele contidas."
      },
      "fifth": "5. Tratamento de dados pessoais",
      "fifthContent": {
        "5_1": "5.1 'Dado pessoal' é qualquer informação que possa identificá-lo quer diretamente (por exemplo, o seu nome) ou indiretamente (por exemplo, dados apresentados sob um pseudónimo, tal como um número de identificação único).",
        "5_2": {
          "question": "5.2. Que dados recolhemos sobre si e como o utilizamos?",
          "answer": "A Good Casting pode recolher os seus dados ao abrigo de um imperativo legal ou normativo, de uma relação contratual, de um interesse legítimo da mesma (no sentido de melhorar os seus produtos e serviços) e/ou de um consentimento informado.",
        },
        "5_3": {
          "content": "5.3.Quem pode aceder aos seus dados pessoais?",
          "subtitle": "Podemos partilhar os seus dados pessoais para:",
          "a": "a) cumprir as obrigações legais ou contratuais, para melhorar os nossos produtos e serviços ou após ter obtido o seu consentimento.",
          "b": "b) cumprir qualquer decisão e/ou procedimento instaurado por qualquer autoridade judicial, órgão regulador e/ou fiscalizador competente; e",
          "c": "c) responder a reclamações de que tal conteúdo viole direitos de terceiros ou legislação aplicável em vigor com vistas a proteger o interesse da Good Casting ou de terceiros.",
          "5_3_1": "5.3.1 Dependendo da finalidade para as quais são recolhidos, e exclusivamente na medida da necessidade de conhecimento, a Good Casting pode ter acesso a alguns dos seus dados pessoais; quando possível os dados são apresentados sob um pseudónimo (não permitindo a identificação direta), e, sempre que necessário para lhe fornecer os serviços solicitados.",
          "5_3_2": "5.3.2 Existem entidades externas que auxiliam a Good Casting, no fornecimento de serviços de IT, tais como serviços de Alojamento WEB e manutenção, bem como software e aplicações podem conter dados que podem por vezes implicar acesso aos seus dados pessoais para a realização das tarefas necessárias).",
          "5_3_3": "5.3.3 A Good Casting compromete-se a não divulgar e/ou vender para terceiros, informações relativas a dados cadastrais que não estejam disponíveis publicamente no Website.",
        },
        "5_4": {
          "question": "5.4. Onde armazenamos os seus dados pessoais?",
          "answer": "Os dados que recolhemos de si e pelos quais somos responsáveis estão armazenados num local na União Europeia."
        },
        "5_5": {
          "content": "5.5. Quanto tempo guardamos os seus dados pessoais?",
          "5_5_1": "5.5.1 Só armazenamos os seus dados pessoais pelo tempo necessário para atingir a finalidade associada ao tratamento dos mesmos. Para determinar o período de retenção dos dados, usamos os seguintes critérios:",
          "a": "a)Quando se registar na Plataforma Good Casting armazenaremos os seus dados durante o período em que utilizar o nosso website enquanto Profissional inscrito;",
          "b": "b) Se após o primeiro ano de inscrição (gratuito) o Profissional decidir não manter o seu perfil no website, este ficará inactivo e os seus dados não serão visíveis;",
          "c": "c)Quando enviar os documentos exigidos para verificação e validação de contas manteremos os mesmos pelo tempo suficiente para a execução do seu objetivo. Após isso serão totalmente eliminados de todos os nossos sistemas;",
          "d": "c)A Good Casting pode reter alguns dos seus dados pessoais para cumprir as suas obrigações legais ou regulamentares, bem como para administrar os seus direitos (por exemplo para fazer valer as petições em Tribunais) ou para efeitos estatísticos ou históricos;",
          "5_5_2": "5.5.2 Quando já não seja necessária a utilização dos seus dados pessoais, estes serão removidos do sistema da Good Casting ou mantidos de forma anónima para que não possa ser identificado a partir dos dados.",
          "5_5_3": "5.5.3 A Good Casting está empenhada em manter os seus dados pessoais protegidos e toma todas as precauções adequadas para o fazer. Como tal, é exigido contratualmente que as entidades externas de confiança que tratam dos seus dados pessoais em nosso nome, façam o mesmo."
        },
        "5_6": {
          "content": "5.6. Os seus Direitos e Escolhas",
          "subtitle": "A Good Casting respeita o seu direito à privacidade e à proteção dos seus dados: é importante que seja capaz de controlar os seus dados pessoais. Tem os seguintes direitos:",
          "5_6_1": "5.6.1 Tem direito a obter informação clara, transparente e facilmente compreensível acerca da forma como usamos os seus dados pessoais e acerca dos seus direitos. É por essa razão que lhe fornecemos informação na presente Política.",
          "5_6_2": "5.6.2 Tem direito de acesso aos dados pessoais que detemos sobre si (sujeito a determinadas limitações). Podemos cobrar uma taxa razoável tendo em consideração o custo administrativo do fornecimento da informação e pedidos manifestamente infundados, excessivos ou repetitivos poderão não ser atendidos.",
          "5_6_3": "5.6.3 Tem direito à retificação dos seus dados pessoais se estiverem incorretos ou desatualizados e/ou a completá-los se estes estiverem incompletos.",
          "5_6_4": "5.6.4 Em alguns casos, tem direito a que os seus dados pessoais sejam apagados ou eliminados. Tenha em consideração que este não é um direito absoluto, uma vez que podemos ter fundamentos legais ou legítimos para a retenção dos seus dados pessoais. Se deseja que eliminemos os seus dados contacte-nos por favor.",
          "5_6_5": "5.6.5. Pode retirar o seu consentimento ao nosso tratamento dos seus dados quando o referido tratamento for baseado no seu consentimento. A retirada do consentimento não afeta a legalidade do tratamento baseado no consentimento antes da respetiva retirada.",
          "5_6_6": "5.6.6. Pode opor-se em qualquer momento ao tratamento dos seus dados quando o referido tratamento tem por base um interesse legítimo.",
          "5_6_7": "5.6.7 Não hesite em contactar-nos para os dados infra referidos antes de apresentar qualquer queixa junto da autoridade de proteção de dados competente, nomeadamente a Comissão Nacional de Proteção de Dados.",
          "5_6_8": "5.6.8. Tem direito de mover, copiar ou transferir os dados da nossa base de dados para outra. O presente aplica-se apenas a dados que forneceu, quando o tratamento se basear no seu consentimento ou em contrato e o tratamento for realizado por meios automatizados.",
          "5_6_9": "5.6.9. Tem direito a solicitar a restrição do tratamento dos seus dados. Este direito significa que o nosso tratamento dos seus dados é restrito, portanto podemos armazená-los, mas não os podemos utilizar, nem os submeter a tratamento adicional.",
        }
      },
      "sixth": "6. Outras disposições gerais",
      "sixthContent": "A Good Casting reserva o direito de, a todo o momento e sem aviso prévio, alterar a presente Política de Privacidade, mas compromete-se a avisar todos os seus utilizadores numa fase posterior.",
      "seventh": "7. Contactos",
      "seventhContent": {
        "content": "Para qualquer questão relacionada com esta Política de Privacidade e para exercício de qualquer direito referido anteriormente pode entrar em contacto com o Encarregado da Proteção de Dados da Good Casting, através de:",
        "name": "Nome: Claudio Alcala",
        "location": "Morada: Rocha Conde de Obidos",
        "zipcode": "Código Postal: 1300-252",
        "phone": "Tel: 965 592 846",
        "email": "E-mail: goodcastinginfo@gmail.com"
      }
    };
    
    if(fieldName.length === 2){
      return strings[fieldName[0]][fieldName[1]]
    }

    if(fieldName.length === 3){
      return strings[fieldName[0]][fieldName[1]][fieldName[2]]
    }

    if(fieldName.length === 4){
      return strings[fieldName[0]][fieldName[1]][fieldName[2]][fieldName[3]]
    }

    return strings[fieldName[0]];
  };

  return (
    <Container>
      <HeaderWithMenu withGoBack style={styles.header} />
      <Paragraph type="title" style={styles.title}>
        {t('title')}
      </Paragraph>
      <TermsContainer
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Paragraph style={styles.text}>
          {t('subtitle')}
        </Paragraph>
        <Paragraph style={styles.text}>
          {t('important')}
        </Paragraph>
        <Paragraph style={[styles.text, styles.bold]}>{t('first')}</Paragraph>
        <Paragraph style={styles.text}>
          {t('firstContent.1_1')}
        </Paragraph>
        <Paragraph style={styles.text}>
          {t('firstContent.1_2')}
        </Paragraph>
        <Paragraph style={[styles.text, styles.bold]}>{t('second')}</Paragraph>
        <Paragraph style={styles.text}>{t('secondContent')}</Paragraph>
        <Paragraph style={[styles.text, styles.bold]}>{t('third')}</Paragraph>
        <Paragraph style={styles.text}>{t('thirdContent.3_1')}</Paragraph>
        <Paragraph style={styles.text}>{t('thirdContent.3_2')}</Paragraph>
        <Paragraph style={styles.text}>{t('thirdContent.3_3')}</Paragraph>
        <Paragraph style={[styles.text, styles.bold]}>{t('fifth')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_1')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_2.question')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_2.answer')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.content')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.subtitle')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.a')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.b')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.c')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.5_3_1')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.5_3_2')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.5_3_3')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_4.question')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_4.answer')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_3.content')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_5.5_5_1')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_5.a')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_5.b')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_5.c')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_5.5_5_2')}</Paragraph>
        <Paragraph style={styles.text}>{t('fifthContent.5_5.5_5_3')}</Paragraph>
        <Paragraph style={[styles.text, styles.bold]}>{t('sixth')}</Paragraph>
        <Paragraph style={styles.text}>{t('sixthContent')}</Paragraph>
        <Paragraph style={[styles.text, styles.bold]}>{t('seventh')}</Paragraph>
        <Paragraph style={styles.text}>{t('seventhContent.content')}</Paragraph>
        <Paragraph style={styles.text}>{t('seventhContent.name')}</Paragraph>
        <Paragraph style={styles.text}>{t('seventhContent.location')}</Paragraph>
        <Paragraph style={styles.text}>{t('seventhContent.zipcode')}</Paragraph>
        <Paragraph style={styles.text}>{t('seventhContent.phone')}</Paragraph>
        <Paragraph style={styles.text}>{t('seventhContent.email')}</Paragraph>
      </TermsContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
  },
  title: {
    marginBottom: 40,
  },
  subtitle: {
    marginBottom: 24,
  },
  text: {
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Terms;
