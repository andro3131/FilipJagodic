# EmailJS nastavitev za filipjagodic.com

## 1. Registracija
- Pojdi na https://emailjs.com in naredi brezplačen račun (200 mailov/mesec)

## 2. Dodaj Email Service
- **Email Services** → **Add New Service**
- Izberi **Outlook** (za Hotmail)
- Vpiši email: `rokvolfand1@hotmail.com` in geslo
- Klikni **Create Service**
- Zapiši si **Service ID** (npr. `service_abc123`)

## 3. Naredi Email Template
- **Email Templates** → **Create New Template**
- Klikni na **Code Editor** (HTML način)

### Nastavitve na vrhu:
- **To Email:** `rokvolfand1@hotmail.com`
- **From Email:** `rokvolfand1@hotmail.com`
- **From Name:** `Filip Jagodič — poizvedba`
- **Reply To:** `{{from_email}}`
- **Subject:** `Nova poizvedba — Filip Jagodič od {{from_name}}`

### Content (celotno HTML kopiraj v editor):

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0c; padding: 20px;">
    <div style="background: #141618; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; border-bottom: 2px solid #D44040;">
        <span style="font-size: 32px; font-weight: 900; letter-spacing: 2px; font-family: Georgia, 'Times New Roman', serif; color: #D44040;">Filip Jagodič</span>
        <p style="color: rgba(255,255,255,0.5); margin: 10px 0 0 0; font-size: 14px;">Nova kontaktna poizvedba</p>
    </div>

    <div style="background: #111114; padding: 30px; border-radius: 0 0 10px 10px; color: #e0e0e0;">
        <h2 style="color: #ffffff; border-bottom: 2px solid #D44040; padding-bottom: 10px; font-size: 18px;">Kontaktni podatki</h2>

        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
            <tr>
                <td style="padding: 12px; background: rgba(255,255,255,0.05); font-weight: bold; width: 100px; border: 1px solid rgba(255,255,255,0.1); color: #a0a0b0;">Ime:</td>
                <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #ffffff;">{{from_name}}</td>
            </tr>
            <tr>
                <td style="padding: 12px; background: rgba(255,255,255,0.05); font-weight: bold; border: 1px solid rgba(255,255,255,0.1); color: #a0a0b0;">Email:</td>
                <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    <a href="mailto:{{from_email}}" style="color: #D44040; text-decoration: none; font-weight: 600;">{{from_email}}</a>
                </td>
            </tr>
        </table>

        <h2 style="color: #ffffff; border-bottom: 2px solid #D44040; padding-bottom: 10px; margin-top: 30px; font-size: 18px;">Sporočilo</h2>
        <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 5px; margin: 20px 0; line-height: 1.6; border: 1px solid rgba(255,255,255,0.1); color: #e0e0e0;">
            {{message}}
        </div>

        <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: #6b7280; font-size: 12px; margin-top: 30px;">
            <p style="margin: 5px 0;"><strong style="color: #a0a0b0;">Filip Jagodič — Glasba presega vse meje</strong></p>
            <p style="margin: 5px 0;"><a href="https://filipjagodic.com" style="color: #D44040; text-decoration: none;">filipjagodic.com</a></p>
        </div>
    </div>
</div>
```

- Klikni **Save**
- Zapiši si **Template ID** (npr. `template_xyz789`)

## 4. Najdi Public Key
- Klikni **Account** → **General**
- Pod **API Keys** najdi **Public Key** (npr. `aBcDeFgHiJkLm`)
- Zapiši si ga

## 5. Pošlji nazaj te tri podatke:
- **Service ID**
- **Template ID**
- **Public Key**
