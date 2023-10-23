import { differenceInYears, parse } from 'date-fns';

export function calcAge(birthdate) {
    try {
        const birth_date = birthdate.slice(0, 10)
        const date = parse(birth_date, "yyyy-MM-dd", new Date());
        const age = differenceInYears(new Date(), date);
        return age;
    } catch (error) {
        return 0;
    }
}

export function toReal(number) {
    if (typeof number !== "number")
        return `${number.replace(".", ",")}`
    return `R$ ${number.toFixed(2).replace(".", ",")}`
}

export function checkNotificationTranslation(message) {
    if (
        message === "Aviso" ||
        message === "Você foi selecionado para participar de um casting" ||
        message === "Preencha todos os campos" ||
        message === "Selecione todos os itens" ||
        message === "approvedRegistrationTitle" ||
        message === "approvedRegistrationDescription" ||
        message === "newInvitationTitle" ||
        message === "newInvitationDescription" ||
        message === "selectedModelAcceptedInvitationTitle" ||
        message === "Catálogo" ||
        message === "Campanha Publicitária / Ficção" ||
        message === "Desfile" ||
        message === "Modelo de Prova / Eventos" ||
        message === "selectedParticipateJobTitle"
    ) {
        return true;
    } else {
        return false;
    }
}