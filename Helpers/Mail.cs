using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace VNPT2021.Helpers
{
    public class Mail
    {
        #region Attributes - Properties
        private string _fromMail;
        public string FromMail
        {
            get { return _fromMail; }
            set { _fromMail = value; }
        }
        private string _userName;
        public string UserName
        {
            get { return _userName; }
            set { _userName = value; }
        }
        private string _password;
        public string Password
        {
            get { return _password; }
            set { _password = value; }
        }
        private string _display;
        public string Display
        {
            get { return _display; }
            set { _display = value; }
        }
        private string _toMail;
        public string ToMail
        {
            get { return _toMail; }
            set { _toMail = value; }
        }
        private string _subject;
        public string Subject
        {
            get { return _subject; }
            set { _subject = value; }
        }
        private string _body;
        public string Body
        {
            get { return _body; }
            set { _body = value; }
        }
        private string _sMTPServer;
        public string SMTPServer
        {
            get { return _sMTPServer; }
            set { _sMTPServer = value; }
        }
        private int _sMTPPort;
        public int SMTPPort
        {
            get { return _sMTPPort; }
            set { _sMTPPort = value; }
        }
        private bool _isMailUsingSSL;
        public bool IsMailUsingSSL
        {
            get { return _isMailUsingSSL; }
            set { _isMailUsingSSL = value; }
        }
        private bool _isMailBodyHtml;
        public bool IsMailBodyHtml
        {
            get { return _isMailBodyHtml; }
            set { _isMailBodyHtml = value; }
        }
        #endregion

        public Mail()
        {
            _sMTPPort = AppGlobal.SMTPPort;
            _sMTPServer = AppGlobal.SMTPServer;
            _isMailBodyHtml = true;
            _isMailUsingSSL = true;
            _fromMail = AppGlobal.MasterEmailUser;
            _userName = AppGlobal.MasterEmailUser;
            _password = AppGlobal.MasterEmailPassword;
            _display = AppGlobal.MasterEmailDisplay;
            _subject = AppGlobal.MasterEmailSubject;
            _toMail = AppGlobal.MasterEmailUser + ",";
        }
        public static string SendMail(Mail mail)
        {
            string result = AppGlobal.InitializationString;
            System.Net.Mail.MailMessage smail = new System.Net.Mail.MailMessage();
            smail.IsBodyHtml = mail.IsMailBodyHtml;
            smail.BodyEncoding = System.Text.Encoding.GetEncoding("UTF-8");
            smail.From = new System.Net.Mail.MailAddress(mail.FromMail, mail.Display);
            foreach (string toMailAddress in mail.ToMail.Split(','))
            {
                if (!string.IsNullOrEmpty(toMailAddress))
                {
                    smail.To.Add(new System.Net.Mail.MailAddress(toMailAddress));
                }
            }
            smail.Subject = mail.Subject;
            smail.Body = mail.Body;
            smail.Priority = MailPriority.High;
            System.Net.Mail.SmtpClient Client = new System.Net.Mail.SmtpClient();
            Client.EnableSsl = mail.IsMailUsingSSL;
            Client.Host = mail.SMTPServer;
            Client.Port = mail.SMTPPort;
            System.Net.NetworkCredential theCredential = new System.Net.NetworkCredential(mail.UserName, mail.Password);
            Client.Credentials = theCredential;
            try
            {
                Client.Send(smail);
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }        
    }
}
