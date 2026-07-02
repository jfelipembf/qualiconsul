(function () {
  var form = document.getElementById('whatsappForm');
  if (!form) return;

  var waName = document.getElementById('wa_name');
  var waService = document.getElementById('wa_service');
  var waPhone = document.getElementById('wa_phone');
  var waEmail = document.getElementById('wa_email');
  var waMessage = document.getElementById('wa_message');

  var errName = document.getElementById('wa_name_err');
  var errService = document.getElementById('wa_service_err');
  var errPhone = document.getElementById('wa_phone_err');
  var errEmail = document.getElementById('wa_email_err');
  var errMessage = document.getElementById('wa_message_err');

  var whatsappNumber = '552130900423';

  function clearErrors() {
    [waName, waService, waPhone, waEmail, waMessage].forEach(function (el) {
      el.classList.remove('is-invalid');
      el.removeAttribute('aria-invalid');
    });
    [errName, errService, errPhone, errEmail, errMessage].forEach(function (p) {
      p.textContent = '';
    });
  }

  function setFieldError(el, errEl, msg) {
    el.classList.add('is-invalid');
    el.setAttribute('aria-invalid', 'true');
    errEl.textContent = msg;
  }

  function nameCharsValid(v) {
    try {
      return /^[\p{L}\s'-]+$/u.test(v);
    } catch (e) {
      return /^[A-Za-zÀ-ÿ\u00C0-\u024F\s'-]+$/.test(v);
    }
  }

  function validateFullName(raw) {
    var v = (raw || '').trim().replace(/\s+/g, ' ');
    if (!v) return 'Informe seu nome completo.';
    if (!nameCharsValid(v))
      return 'Use apenas letras, espaços, hífen ou apóstrofo.';
    var parts = v.split(' ').filter(Boolean);
    if (parts.length < 2) return 'Informe nome e sobrenome (pelo menos duas palavras).';
    if (v.length < 6) return 'Nome muito curto.';
    return '';
  }

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function validateEmail(raw) {
    var v = (raw || '').trim();
    if (!v) return 'Informe um e-mail.';
    if (!emailRe.test(v)) return 'Digite um e-mail válido (ex.: contato@gmail.com).';
    return '';
  }

  function digitsOnly(s) {
    return (s || '').replace(/\D/g, '');
  }

  /* Máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX */
  function formatPhoneBR(d) {
    d = d.slice(0, 11);
    if (d.length === 0) return '';
    if (d.length <= 2) return '(' + d;
    var ddd = d.slice(0, 2);
    var rest = d.slice(2);
    if (rest.length <= 4) return '(' + ddd + ') ' + rest;
    if (d.length <= 10) return '(' + ddd + ') ' + rest.slice(0, 4) + '-' + rest.slice(4, 8);
    return '(' + ddd + ') ' + rest.slice(0, 5) + '-' + rest.slice(5, 9);
  }

  function validatePhoneMasked(masked) {
    var d = digitsOnly(masked);
    if (d.length < 10) return 'Informe DDD + número (10 ou 11 dígitos).';
    if (d.length > 11) return 'Telefone inválido.';
    var ddd = parseInt(d.slice(0, 2), 10);
    if (ddd < 11 || ddd > 99) return 'DDD inválido.';
    return '';
  }

  var genericMsg = /^(teste|oi|ok|a+o*|ola+|olá+|mensagem|asd+|lorem|123+|abc|asdf|qwert|\.+)$/i;

  function validateMessage(raw) {
    var v = (raw || '').trim();
    if (v.length < 20) return 'A mensagem deve ter pelo menos 20 caracteres.';
    if (genericMsg.test(v)) return 'Escreva uma mensagem mais específica sobre sua necessidade.';
    if (/^(.)\1{18,}$/.test(v)) return 'Evite repetições de um único caractere.';
    return '';
  }

  function validateService() {
    var v = waService.value;
    if (!v) return 'Selecione um serviço de interesse.';
    return '';
  }

  waPhone.addEventListener('input', function () {
    var d = digitsOnly(waPhone.value);
    waPhone.value = formatPhoneBR(d);
  });

  waPhone.addEventListener('blur', function () {
    errPhone.textContent = validatePhoneMasked(waPhone.value);
    if (errPhone.textContent) setFieldError(waPhone, errPhone, errPhone.textContent);
    else {
      waPhone.classList.remove('is-invalid');
      waPhone.removeAttribute('aria-invalid');
      errPhone.textContent = '';
    }
  });

  waName.addEventListener('blur', function () {
    var msg = validateFullName(waName.value);
    errName.textContent = msg;
    if (msg) setFieldError(waName, errName, msg);
    else {
      waName.classList.remove('is-invalid');
      waName.removeAttribute('aria-invalid');
      errName.textContent = '';
    }
  });

  waEmail.addEventListener('blur', function () {
    var msg = validateEmail(waEmail.value);
    errEmail.textContent = msg;
    if (msg) setFieldError(waEmail, errEmail, msg);
    else {
      waEmail.classList.remove('is-invalid');
      waEmail.removeAttribute('aria-invalid');
      errEmail.textContent = '';
    }
  });

  waMessage.addEventListener('blur', function () {
    var msg = validateMessage(waMessage.value);
    errMessage.textContent = msg;
    if (msg) setFieldError(waMessage, errMessage, msg);
    else {
      waMessage.classList.remove('is-invalid');
      waMessage.removeAttribute('aria-invalid');
      errMessage.textContent = '';
    }
  });

  waService.addEventListener('change', function () {
    errService.textContent = '';
    waService.classList.remove('is-invalid');
    waService.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var order = [
      { el: waName, err: errName, msg: function () { return validateFullName(waName.value); } },
      { el: waService, err: errService, msg: validateService },
      { el: waPhone, err: errPhone, msg: function () { return validatePhoneMasked(waPhone.value); } },
      { el: waEmail, err: errEmail, msg: function () { return validateEmail(waEmail.value); } },
      { el: waMessage, err: errMessage, msg: function () { return validateMessage(waMessage.value); } }
    ];

    var firstInvalid = null;
    for (var i = 0; i < order.length; i++) {
      var m = typeof order[i].msg === 'function' ? order[i].msg() : order[i].msg;
      if (m) {
        setFieldError(order[i].el, order[i].err, m);
        if (!firstInvalid) firstInvalid = order[i].el;
      }
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var name = waName.value.trim().replace(/\s+/g, ' ');
    var service = waService.value;
    var phone = waPhone.value.trim();
    var email = waEmail.value.trim();
    var message = waMessage.value.trim();

    var text =
      '*Contato — Qualiconsul*\n\n' +
      '*Nome:* ' + name + '\n' +
      '*Serviço de interesse:* ' + service + '\n' +
      '*Telefone:* ' + phone + '\n' +
      '*E-mail:* ' + email + '\n\n' +
      '*Mensagem:*\n' + message;

    var whatsappUrl =
      'https://api.whatsapp.com/send?phone=' + whatsappNumber + '&text=' + encodeURIComponent(text);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
})();
