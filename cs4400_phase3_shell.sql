-- CS4400: Introduction to Database Systems
-- Bank Management Project - Phase 3 (v2)
-- Generating Stored Procedures & Functions for the Use Cases
-- April 4th, 2022

-- implement these functions and stored procedures on the project database
use bank_management;

-- [1] create_corporation()
-- This stored procedure creates a new corporation
drop procedure if exists create_corporation;
delimiter //
create procedure create_corporation (in ip_corpID varchar(100),
    in ip_shortName varchar(100), in ip_longName varchar(100),
    in ip_resAssets integer)
begin
	 insert into corporation value (ip_corpID, ip_shortName, ip_longName, ip_resAssets);
end //
delimiter ;

-- [2] create_bank()
-- This stored procedure creates a new bank that is owned by an existing corporation
-- The corporation must also be managed by a valid employee [being a manager doesn't leave enough time for other jobs]
drop procedure if exists create_bank;
delimiter //
create procedure create_bank (in ip_bankID varchar(100), in ip_bankName varchar(100),
	in ip_street varchar(100), in ip_city varchar(100), in ip_state char(2),
    in ip_zip char(5), in ip_resAssets integer, in ip_corpID varchar(100),
    in ip_manager varchar(100), in ip_bank_employee varchar(100))
begin
	-- Implement your code here
    IF EXISTS(select * from corporation where corpID = ip_corpID) AND EXISTS(select * from employee where perID = ip_manager) THEN 
    IF ip_resAssets is null THEN 
		set ip_resAssets = 0;
    end if;
	INSERT INTO bank
    values (ip_bankID, ip_bankName, ip_street, ip_city, ip_state, ip_zip, ip_resAssets , ip_corpID, ip_manager);
    INSERT INTO workFOR
    values (ip_bankID, ip_bank_employee);
	END IF;
end //
delimiter ;

-- [3] start_employee_role()
-- If the person exists as an admin or employee then don't change the database state [not allowed to be admin along with any other person-based role]
-- If the person doesn't exist then this stored procedure creates a new employee
-- If the person exists as a customer then the employee data is added to create the joint customer-employee role
drop procedure if exists start_employee_role;
delimiter //
create procedure start_employee_role (in ip_perID varchar(100), in ip_taxID char(11),
	in ip_firstName varchar(100), in ip_lastName varchar(100), in ip_birthdate date,
    in ip_street varchar(100), in ip_city varchar(100), in ip_state char(2),
    in ip_zip char(5), in ip_dtJoined date, in ip_salary integer,
    in ip_payments integer, in ip_earned integer, in emp_password  varchar(100))
begin
	-- Implement your code here
    IF (exists (select P.perID from person P where P.perID = ip_perID)) THEN
		IF not (exists (select A.perid from system_admin A where A.perID = ip_perID) 
		or exists (select E.perID from employee E where E.perID = ip_perID)) THEN
			insert into bank_user values (ip_perID, ip_taxID, ip_birthdate, ip_firstName, ip_lastName,
				ip_dtJoined, ip_street, ip_city, ip_state, ip_zip);
			insert into employee values (ip_perID, ip_salary, ip_payments, ip_earned);
		end IF;
	ELSE
		insert into person values (ip_perID, emp_password);
		insert into bank_user values (ip_perID, ip_taxID, ip_birthdate, ip_firstName, ip_lastName,
            ip_dtJoined, ip_street, ip_city, ip_state, ip_zip);
		insert into employee values (ip_perID, ip_salary, ip_payments, ip_earned);
	end IF;
end //
delimiter ;










-- [4] start_customer_role()
-- If the person exists as an admin or customer then don't change the database state [not allowed to be admin along with any other person-based role]
-- If the person doesn't exist then this stored procedure creates a new customer
-- If the person exists as an employee then the customer data is added to create the joint customer-employee role
drop procedure if exists start_customer_role;
delimiter //
create procedure start_customer_role (in ip_perID varchar(100), in ip_taxID char(11),
	in ip_firstName varchar(100), in ip_lastName varchar(100), in ip_birthdate date,
    in ip_street varchar(100), in ip_city varchar(100), in ip_state char(2),
    in ip_zip char(5), in ip_dtJoined date, in cust_password varchar(100))
begin
	-- Implement your code here
    if
		(ip_perID not in (select perID from system_admin) or (ip_perID not in (select perID from customer))) and ip_perID in (select perID from employee)
    then 
		insert into customer values (ip_perID);
	end if;
	if 
		(ip_perID not in (select perID from system_admin) or (ip_perID not in (select perID from customer))) and ip_perID not in (select perID from employee)
	then 
		insert into person values (ip_perID, cust_password);
		insert into bank_user values (ip_perID, ip_taxID, ip_birthdate, ip_firstName, ip_lastName, ip_dtJoined, ip_street, ip_city, ip_state, ip_zip);
		insert into customer values (ip_perID);
	end if;
end //
delimiter ;














-- [5] stop_employee_role()
-- If the person doesn't exist as an employee then don't change the database state
-- If the employee manages a bank or is the last employee at a bank then don't change the database state [each bank must have a manager and at least one employee]
-- If the person exists in the joint customer-employee role then the employee data must be removed, but the customer information must be maintained
-- If the person exists only as an employee then all related person data must be removed
drop procedure if exists stop_employee_role;
delimiter //
create procedure stop_employee_role (in ip_perID varchar(100))
sp_main: begin
	-- Implement your code here
    if ((not exists(select * from employee where ip_perID = employee.perID))
	or exists(select * from bank where ip_perID = bank.manager)
	or (1 in (select count(*) from workfor where bankID in
	(select bankID from workfor where workfor.perID = ip_perID) group by bankID))) then
		leave sp_main;
    end if;
    delete from workfor where workfor.perID = ip_perID;
    delete from employee where employee.perID = ip_perID;
    if (not exists(select * from customer where customer.perID = ip_perID)) then
		delete from bank_user where bank_user.perID = ip_perID;
        delete from person where person.perID = ip_perID;
	end if;
end //
delimiter ;

-- [6] stop_customer_role()
-- If the person doesn't exist as an customer then don't change the database state
-- If the customer is the only holder of an account then don't change the database state [each account must have at least one holder]
-- If the person exists in the joint customer-employee role then the customer data must be removed, but the employee information must be maintained
-- If the person exists only as a customer then all related person data must be removed
drop procedure if exists stop_customer_role;
delimiter //
create procedure stop_customer_role (in ip_perID varchar(100))
begin
	-- Implement your code here
    IF EXISTS(select * from customer where perID = ip_perID) AND ((select COUNT((accountID)) from access where (bankID, accountID) in (select bankID, accountID from access where perID = ip_perID)) - (select COUNT(DISTINCT(accountID)) from access where (bankID, accountID) in (select bankID, accountID from access where perID = ip_perID))) > 0   THEN
		DELETE FROM access where  perID = ip_perID;
		DELETE FROM customer_contacts where  perID = ip_perID;
		DELETE FROM customer where  perID = ip_perID;
	END IF;
    
    IF NOT EXISTS(select * from employee where perID = ip_perID)  THEN
		DELETE FROM bank_user where perID = ip_perID;
		DELETE FROM person where  perID = ip_perID;
	END IF;
end //
delimiter ;

-- [7] hire_worker()
-- If the person is not an employee then don't change the database state
-- If the worker is a manager then then don't change the database state [being a manager doesn't leave enough time for other jobs]
-- Otherwise, the person will now work at the assigned bank in addition to any other previous work assignments
-- Also, adjust the employee's salary appropriately
drop procedure if exists hire_worker;
delimiter //
create procedure hire_worker (in ip_perID varchar(100), in ip_bankID varchar(100),
	in ip_salary integer)
begin
	-- Implement your code here
    IF (exists (select E.perID from employee E where E.perID = ip_perID)) THEN
		IF (not exists (select B.manager from bank B where ip_perID = B.manager)) THEN
		    update employee set salary = ip_salary where perID = ip_perID;
            insert into workFor values (ip_bankID, ip_perID);
		end IF;
	end IF;
end //
delimiter ;












-- [8] replace_manager()
-- If the new person is not an employee then don't change the database state
-- If the new person is a manager or worker at any bank then don't change the database state [being a manager doesn't leave enough time for other jobs]
-- Otherwise, replace the previous manager at that bank with the new person
-- The previous manager's association as manager of that bank must be removed
-- Adjust the employee's salary appropriately
drop procedure if exists replace_manager;
delimiter //
create procedure replace_manager (in ip_perID varchar(100), in ip_bankID varchar(100),
	in ip_salary integer)
begin
	if	ip_perID  in (select perID from employee) and  ( (ip_perID not in (select perID from workFor)) and ((ip_perID not in (select manager from bank))))
    then 
        
		update bank
        set manager = ip_perID 
        where ip_bankID = bankID;
        
        #Adjust the employee's salary appropriately
        update employee
        set salary = ip_salary
        where ip_perID = perID;
        
	end if;
end //
delimiter ;













-- [9] add_account_access()
-- If the account does not exist, create a new account. If the account exists, add the customer to the account
-- When creating a new account:
    -- If the person opening the account is not an admin then don't change the database state
    -- If the intended customer (i.e. ip_customer) is not a customer then don't change the database state
    -- Otherwise, create a new account owned by the designated customer
    -- The account type will be determined by the enumerated ip_account_type variable
    -- ip_account_type in {checking, savings, market}
-- When adding a customer to an account:
    -- If the person granting access is not an admin or someone with access to the account then don't change the database state
    -- If the intended customer (i.e. ip_customer) is not a customer then don't change the database state
    -- Otherwise, add the new customer to the existing account
drop procedure if exists add_account_access;
delimiter //
create procedure add_account_access (in ip_requester varchar(100), in ip_customer varchar(100),
	in ip_account_type varchar(10), in ip_bankID varchar(100),
    in ip_accountID varchar(100), in ip_balance integer, in ip_interest_rate integer,
    in ip_dtDeposit date, in ip_minBalance integer, in ip_numWithdrawals integer,
    in ip_maxWithdrawals integer, in ip_dtShareStart date)
sp_main: begin
	-- Implement your code here
	if (not exists(select * from bank_account where ip_bankID = bank_account.bankID and ip_accountID = bank_account.accountID)) then
		if (not exists(select * from system_admin where ip_requester = system_admin.perID) 
        or not exists(select * from customer where ip_customer = customer.perID)) then 
			leave sp_main;
		end if;
		insert into bank_account value (ip_bankID, ip_accountID, ip_balance);
        if (ip_account_type = "checking") then
			insert into checking value(ip_bankID, ip_accountID, null, null, null, null);
		else
			insert into interest_bearing value(ip_bankID, ip_accountID, ip_interest_rate, ip_dtDeposit);
			if (ip_account_type = "market") then 
				insert into market value(ip_bankID, ip_accountID, ip_maxWithdrawals, ip_numWithdrawals);
			else 
				insert into savings value(ip_bankID, ip_accountID, ip_minBalance);
			end if;
		end if;
        insert into access value (ip_customer, ip_bankID, ip_accountID, ip_dtShareStart, ip_dtDeposit);
	elseif (exists(select * from system_admin where ip_requester = system_admin.perID) or exists(select * from access where ip_requester = access.perID)) then 
		if (not exists(select * from customer where ip_customer = customer.perID)) then 
			leave sp_main;
		end if;
		insert into access value (ip_customer, ip_bankID, ip_accountID, ip_dtShareStart, ip_dtDeposit);
	end if;
end //
delimiter ;

-- [10] remove_account_access()
-- Remove a customer's account access. If they are the last customer with access to the account, close the account
-- When just revoking access:
    -- If the person revoking access is not an admin or someone with access to the account then don't change the database state
    -- Otherwise, remove the designated sharer from the existing account
-- When closing the account:
    -- If the customer to be removed from the account is NOT the last remaining owner/sharer then don't close the account
    -- If the person closing the account is not an admin or someone with access to the account then don't change the database state
    -- Otherwise, the account must be closed
drop procedure if exists remove_account_access;
delimiter //
create procedure remove_account_access (in ip_requester varchar(100), in ip_sharer varchar(100),
	in ip_bankID varchar(100), in ip_accountID varchar(100))
begin
	-- Implement your code here
     IF (EXISTS(select * from system_admin where perID = ip_requester) OR EXISTS(select * FROM access where bankID=ip_bankID and accountID=ip_accountID and perID = ip_requester)) AND (select COUNT((accountID)) from access where (bankID, accountID) in (select bankID, accountID from access where perID = ip_sharer)) > 1   THEN
		DELETE FROM access where  perID = ip_sharer and bankID=ip_bankID and accountID=ip_accountID;
	END IF;
    
    IF (EXISTS(select * from system_admin where perID = ip_requester) OR EXISTS(select * FROM access where bankID=ip_bankID and accountID=ip_accountID)) AND (select COUNT((accountID)) from access where (bankID, accountID) in (select bankID, accountID from access where perID = ip_sharer)) = 1   THEN
		DELETE FROM access where  perID = ip_sharer and bankID=ip_bankID and accountID=ip_accountID;
        
        IF EXISTS(select * from savings where bankID=ip_bankID and accountID=ip_accountID) THEN
			DELETE FROM savings where bankID=ip_bankID and accountID=ip_accountID;
        END IF;
        IF EXISTS(select * from interest_bearing where bankID=ip_bankID and accountID=ip_accountID) THEN
			DELETE FROM interest_bearing where bankID=ip_bankID and accountID=ip_accountID;
        END IF;
        IF EXISTS(select * from interest_bearing_fees where bankID=ip_bankID and accountID=ip_accountID) THEN
			DELETE FROM interest_bearing_fees where bankID=ip_bankID and accountID=ip_accountID;
        END IF;
        IF EXISTS(select * from market where bankID=ip_bankID and accountID=ip_accountID) THEN
			DELETE FROM market where bankID=ip_bankID and accountID=ip_accountID;
        END IF;
        IF EXISTS(select * from checking where bankID=ip_bankID and accountID=ip_accountID) THEN
			DELETE FROM checking where bankID=ip_bankID and accountID=ip_accountID;
        END IF;
        IF EXISTS(select * from bank_account where bankID=ip_bankID and accountID=ip_accountID) THEN
			DELETE FROM bank_account where bankID=ip_bankID and accountID=ip_accountID;
        END IF;
        
	END IF;
end //
delimiter ;

-- [11] create_fee()
drop procedure if exists create_fee;
delimiter //
create procedure create_fee (in ip_bankID varchar(100), in ip_accountID varchar(100),
	in ip_fee_type varchar(100))
begin
	-- Implement your code here
    insert into interest_bearing_fees value (ip_bankID, ip_accountID, ip_fee_type);

end //
delimiter ;









-- [12] start_overdraft()
drop procedure if exists start_overdraft;
delimiter //
create procedure start_overdraft (in ip_requester varchar(100),
	in ip_checking_bankID varchar(100), in ip_checking_accountID varchar(100),
    in ip_savings_bankID varchar(100), in ip_savings_accountID varchar(100))
sp_main: begin
if ip_requester in (select perID from access where ip_requester=perID and ip_checking_bankID=bankID
and accountID=ip_checking_accountID)
	and  (select count(*) from savings where bankID=ip_savings_bankID and accountID=ip_savings_accountID) > 0
    and  (select count(*) from checking where bankID=ip_checking_bankID and accountID=ip_checking_accountID) > 0
then update checking set protectionBank=ip_savings_bankID,protectionAccount=ip_savings_accountID
where bankID=ip_checking_bankID and accountID=ip_checking_accountID;
		end if;
	
end //
delimiter ;







-- [13] stop_overdraft()
drop procedure if exists stop_overdraft;
delimiter //
create procedure stop_overdraft (in ip_requester varchar(100),
	in ip_checking_bankID varchar(100), in ip_checking_accountID varchar(100))
sp_main: begin
	-- Implement your code here
	if ((exists(select * from system_admin where ip_requester = system_admin.perID)
    or  exists(select * from access where ip_requester = access.perID))
    and exists(select * from checking where checking.bankID = ip_checking_bankID and checking.accountID = ip_checking_accountID)) then 
		update checking set protectionBank = null, protectionAccount = null where bankID = ip_checking_bankID and accountID = ip_checking_accountID;
    end if;
end //
delimiter ;

-- [14] account_deposit()
-- If the person making the deposit does not have access to the account then don't change the database state
-- Otherwise, the account balance and related info must be modified appropriately
drop procedure if exists account_deposit;
delimiter //
create procedure account_deposit (in ip_requester varchar(100), in ip_deposit_amount integer,
	in ip_bankID varchar(100), in ip_accountID varchar(100), in ip_dtAction date)
begin
	-- Implement your code here
    IF EXISTS(select * from access where perId = ip_requester and bankId = ip_bankID and accountId = ip_accountID) THEN 
	update bank_account
	set balance = balance + ip_deposit_amount
	where bankId = ip_bankID and accountId = ip_accountID;
    update access
	set dtAction = ip_dtAction
	where perId = ip_requester and bankId = ip_bankID and accountId = ip_accountID;
	END IF;
end //
delimiter ;

-- [15] account_withdrawal()
-- If the person making the withdrawal does not have access to the account then don't change the database state
-- If the withdrawal amount is more than the account balance for a savings or market account then don't change the database state [the account balance must be positive]
-- If the withdrawal amount is more than the account balance + the overdraft balance (i.e., from the designated savings account) for a checking account then don't change the database state [the account balance must be positive]
-- Otherwise, the account balance and related info must be modified appropriately (amount deducted from the primary account first, and second from the overdraft account as needed)
drop procedure if exists account_withdrawal;
delimiter //
create procedure account_withdrawal (in ip_requester varchar(100), in ip_withdrawal_amount integer,
	in ip_bankID varchar(100), in ip_accountID varchar(100), in ip_dtAction date)
begin
	-- Implement your code here
    #declare savings int;
    #declare savingsAccountID varchar(100);
    #declare savingsBankID varchar(100);
	if (exists (select * from access
    where (perID = ip_requester)
    and (bankID = ip_bankID) and accountID = ip_accountID)) THEN
		if (exists (select * from checking
        where (bankID = ip_bankID) and (accountID = ip_accountID))) THEN
			set @savingsAccountID := (select protectionAccount
				from checking where (bankID = ip_bankID) and (accountID = ip_accountID)); 
			set @savingsBankID := (select protectionBank
				from checking where (bankID = ip_bankID) and (accountID = ip_accountID)); 
			set @savings := (select balance
				from bank_account where ((bankID = @savingsBankID) and (accountID = @savingsAccountID)));
			if (ip_withdrawal_amount <=
            (select balance from bank_account
            where (bankID = ip_bankID) and (accountID = ip_accountID)) + @savings) THEN
				update access
                set dtAction = ip_dtAction
                where ((perID = ip_requester) and (bankID = ip_bankID) and (accountID = ip_accountID));
				if (ip_withdrawal_amount <=
				(select balance from bank_account
				where (bankID = ip_bankID) and (accountID = ip_accountID))) THEN
					update bank_account
					set balance = balance - ip_withdrawal_amount
					where ((bankID = ip_bankID) and (accountID = ip_accountID));
                else
					set @remaining := ip_withdrawal_amount -
                    (select balance from bank_account
                    where ((bankID = ip_bankID) and (accountID = ip_accountID)));
					update bank_account
                    set balance = balance - @remaining
                    where (bankID = @savingsBankID) and (accountID = @savingsAccountID);
                    update access
					set dtAction = ip_dtAction
					where ((perID = ip_requester) and (bankID = @savingsBankID) and (accountID = @savingsAccountID));
                    update (checking C inner join bank_account B on
                    (C.bankID = B.bankID) and (C.accountID = B.accountID))
					set amount = ip_withdrawal_amount - balance, dtOverdraft = ip_dtAction
					where ((B.bankID = ip_bankID) and (B.accountID = ip_accountID));
					update bank_account
                    set balance = 0
                    where ((bankID = ip_bankID) and (accountID = ip_accountID));
				end if;
            end if;
		elseif (exists (select * from market
        where (bankID = ip_bankID) and (accountID = ip_accountID))) THEN
			if (ip_withdrawal_amount <=
			(select balance from bank_account
			where (bankID = ip_bankID) and (accountID = ip_accountID))) THEN
				update bank_account
                set balance = balance - ip_withdrawal_amount
				where ((bankID = ip_bankID) and (accountID = ip_accountID));
                update market
                set numWithdrawals = numWithdrawals + 1
				where ((bankID = ip_bankID) and (accountID = ip_accountID));
                update access
                set dtAction = ip_dtAction
                where ((perID = ip_requester) and (bankID = ip_bankID) and (accountID = ip_accountID));
			end if;
        else
			if (ip_withdrawal_amount <=
			(select balance from bank_account
			where (bankID = ip_bankID) and (accountID = ip_accountID))) THEN
				update bank_account
                set balance = balance - ip_withdrawal_amount
				where ((bankID = ip_bankID) and (accountID = ip_accountID));
                update access
                set dtAction = ip_dtAction
                where ((perID = ip_requester) and (bankID = ip_bankID) and (accountID = ip_accountID));
			end if;
        end if;
	end IF;
end //
delimiter ;
















-- [16] account_transfer()
-- If the person making the transfer does not have access to both accounts then don't change the database state
-- If the withdrawal amount is more than the account balance for a savings or market account then don't change the database state [the account balance must be positive]
-- If the withdrawal amount is more than the account balance + the overdraft balance (i.e., from the designated savings account) for a checking account then don't change the database state [the account balance must be positive]
-- Otherwise, the account balance and related info must be modified appropriately (amount deducted from the withdrawal account first, and second from the overdraft account as needed, and then added to the deposit account)
drop procedure if exists account_transfer;
delimiter //
create procedure account_transfer (in ip_requester varchar(100), in ip_transfer_amount integer,
	in ip_from_bankID varchar(100), in ip_from_accountID varchar(100),
    in ip_to_bankID varchar(100), in ip_to_accountID varchar(100), in ip_dtAction date)
begin
	declare current_balance INT;
	declare overdraft_balance INT;
	declare to_account_balance INT;
    select balance into current_balance from bank_account where ip_from_bankID = bankID and ip_from_accountID = accountID;
    select balance into to_account_balance from bank_account where ip_to_bankID = bankID and ip_to_accountID = accountID;
	update bank_account set balance = 0 where ip_to_bankID = bankID and ip_to_accountID = accountID and balance is NULL;

    if ip_requester in (select perID from access where ip_from_bankID = bankID and ip_from_accountID = accountID) 
    and ip_requester in (select perID from access where ip_to_bankID = bankID and ip_to_accountID = accountID)
        and (ip_from_accountID in (select accountID from savings where ip_from_bankID = bankID and ip_from_accountID = accountID) or 
			ip_from_accountID in (select accountID from market where ip_from_bankID = bankID and ip_from_accountID = accountID))
	then 
		update bank_account set balance = balance - ip_transfer_amount where ip_from_bankID = bankID and ip_from_accountID = accountID;
        update bank_account set balance = balance + ip_transfer_amount where ip_to_bankID = bankID and ip_to_accountID = accountID ;
	end if;

    
    if ip_requester in (select perID from access where ip_from_bankID = bankID and ip_from_accountID = accountID) 
		and ip_requester in (select perID from access where ip_to_bankID = bankID and ip_to_accountID = accountID)
		and (ip_from_accountID in (select accountID from checking where ip_from_bankID = bankID))
		and current_balance is not NULL and ip_transfer_amount <= current_balance
	then 
		update bank_account set balance = balance - ip_transfer_amount where ip_from_bankID = bankID and ip_from_accountID = accountID;
		update bank_account set balance = balance + ip_transfer_amount where ip_to_bankID = bankID and ip_to_accountID = accountID;	
        #update access set dtAction = ip_dtAction where ip_from_bankID = bankID and ip_from_accountID = accountID;
        #update access set dtAction = ip_dtAction where ip_to_bankID = bankID and ip_to_accountID = accountID;
	end if;
     if ip_requester in (select perID from access where ip_from_bankID = bankID and ip_from_accountID = accountID) 
		and ip_requester in (select perID from access where ip_to_bankID = bankID and ip_to_accountID = accountID)
		and (ip_from_accountID in (select accountID from checking where ip_from_bankID = bankID and ip_from_accountID = accountID))	
	then 
		select balance into overdraft_balance from bank_account 
        where bankID in (select protectionBank from checking where ip_from_bankID = bankID and ip_from_accountID = accountID) 
        and accountID in (select protectionAccount from checking where ip_from_bankID = bankID and ip_from_accountID = accountID);
	end if;
	 if ip_requester in (select perID from access where ip_from_bankID = bankID and ip_from_accountID = accountID) 
	and ip_requester in (select perID from access where ip_to_bankID = bankID and ip_to_accountID = accountID)
	and (ip_from_accountID in (select accountID from checking where ip_from_bankID = bankID and ip_from_accountID = accountID))	
	and current_balance is not NULL  and ip_transfer_amount > current_balance and ip_transfer_amount <= current_balance + overdraft_balance
	then 
		update bank_account set balance = 0 where ip_from_bankID = bankID and ip_from_accountID = accountID;
		update bank_account set balance = balance - (ip_transfer_amount - current_balance) where bankID in (select protectionBank from checking where ip_from_bankID = bankID and ip_from_accountID = accountID) 
       and accountID in (select protectionAccount from checking where ip_from_bankID = bankID and ip_from_accountID = accountID);
		update checking set amount = ip_transfer_amount - current_balance, dtOverdraft = ip_dtAction where ip_from_bankID = bankID and ip_from_accountID = accountID;
		update bank_account set balance = balance + ip_transfer_amount where ip_to_bankID = bankID and ip_to_accountID = accountID;
	end if;
end //
delimiter ;













-- [17] pay_employees()
-- Increase each employee's pay earned so far by the monthly salary
-- Deduct the employee's pay from the banks reserved assets
-- If an employee works at more than one bank, then deduct the (evenly divided) monthly pay from each of the affected bank's reserved assets
-- Truncate any fractional results to an integer before further calculations
drop procedure if exists pay_employees;
delimiter //
create procedure pay_employees ()
begin
update employee set earned = earned + salary
where salary is not null;

update employee set payments = ifnull(payments, 0) + 1;

update (select workfor.bankID, sum(divide) as diff from workfor join
(select workfor.bankID, workfor.perID as perID, floor(salary/count(*)) as divide from
workfor join employee on workfor.perID = employee.perID where salary is not null group by workfor.perID) as t1 on workfor.perID = t1.perID group by workfor.bankID) as t2
join bank on bank.bankID = t2.bankID set bank.resAssets = ifnull(bank.resAssets,0) - t2.diff;
end //
delimiter ;

-- [18] penalize_accounts()
-- For each savings account that is below the minimum balance, deduct the smaller of $100 or 10% of the current balance from the account
-- For each market account that has exceeded the maximum number of withdrawals, deduct the smaller of $500 per excess withdrawal or 20% of the current balance from the account
-- Add all deducted amounts to the reserved assets of the bank that owns the account
-- Truncate any fractional results to an integer before further calculations
drop procedure if exists penalize_accounts;
delimiter //
create procedure penalize_accounts ()
begin
	-- Implement your code here
    update (bank_account JOIN savings ON (bank_account.bankID, bank_account.accountID)=(savings.bankID, savings.accountID)) LEFT JOIN bank on bank_account.bankID = bank.bankID
	set balance = IF(balance -100 < balance*0.9, balance*0.9 div 1, balance - 100), resAssets = resAssets + IF(balance -100 < balance*0.9 , balance*0.1 div 1, 100)
	where balance < minBalance;
    update (bank_account JOIN market ON (bank_account.bankID, bank_account.accountID)=(market.bankID, market.accountID)) LEFT JOIN bank on bank_account.bankID = bank.bankID
	set balance = IF(balance -500 < balance*0.8, balance*0.8 div 1, balance - 500), resAssets = resAssets + IF(balance -500 < balance*0.8, balance*0.2 div 1, 500)
	where maxWithdrawals < numWithdrawals; 
end //
delimiter ;

-- [19] accrue_interest()
-- For each interest-bearing account that is "in good standing", increase the balance based on the designated interest rate
-- A savings account is "in good standing" if the current balance is equal to or above the designated minimum balance
-- A market account is "in good standing" if the current number of withdrawals is less than or equal to the maximum number of allowed withdrawals
-- Subtract all paid amounts from the reserved assets of the bank that owns the account                                                                       
-- Truncate any fractional results to an integer before further calculations
drop procedure if exists accrue_interest;
delimiter //
create procedure accrue_interest ()
begin
	-- Implement your code here
    update ((bank_account B inner join market M on (B.accountID = M.accountID and B.bankID = M.bankID))
    inner join interest_bearing I on (M.accountID = I.accountID and M.bankID = I.bankID)) inner join bank BK on I.bankID = BK.bankID
    set BK.resAssets = IFNULL(BK.resAssets, 0) - ((balance * interest_rate) DIV 100), balance = balance + ((balance * interest_rate) DIV 100)
    where ((M.maxWithdrawals >= M.numWithdrawals or ISNULL(M.maxWithdrawals))
     and interest_rate > 0);
    update ((bank_account B inner join savings S on (B.accountID = S.accountID and B.bankID = S.bankID))
    inner join interest_bearing I on (S.accountID = I.accountID and S.bankID = I.bankID)) inner join bank BK on I.bankID = BK.bankID
    set BK.resAssets = BK.resAssets - ((balance * interest_rate) DIV 100), balance = balance + ((balance * interest_rate) DIV 100)
    where (B.balance >= s.minBalance and interest_rate > 0);
    update bank
    set resAssets = 0 where ISNULL(resAssets);
    
	/*declare total int;
    declare i int default 0;
    declare curr varchar(100);
    set curr := (select bankID from interest_bearing LIMIT 1);
    select count(*) from interest_bearing into total;
    set i = 0;
    while (i < total) DO
		IF (exists (select * from
        savings S inner join curr on S.bankID = curr.bankID)) THEN
			if ((select balance from bank_account B where B.bankID = curr.bankID) >
				(select minBalance from savings S where S.bankID = curr.bankID)) THEN
                update bank_account
                set balance = balance * (100 + interest_rate)
                where bank_account.bankID = curr.bankID;
			end if;
		ELSEIF (exists (select * from 
        market M inner join interest_bearing I on M.bankID = I.bankID)) THEN
			if ((select numWithdrawals from bank_account B where B.bankID = curr.bankID) >
				(select maxWithdrawals from market M where M.bankID = curr.bankID)) THEN
                update bank_account
                set balance = balance * (100 + interest_rate)
                where bank_account.bankID = curr.bankID;
			end if;
		end if;
		set i = i + 1;
        set curr := (select * from interest_bearing LIMIT 1 OFFSET i);
	end while;*/
end //
delimiter ;













-- [20] display_account_stats()
-- Display the simple and derived attributes for each account, along with the owning bank
create or replace view display_account_stats as
select  name_of_bank, account_identifier, account_assets, count(*) as number_of_owners from (select bankName as name_of_bank, bank_account.accountID as account_identifier,balance as account_assets, perID as number_of_owners from bank right outer join bank_account on bank.bankID=bank_account.bankID join access on bank_account.accountID=access.accountID and bank.bankID = access.bankID) as new_table group by account_identifier, name_of_bank, account_assets;














-- [21] display_bank_stats()
-- Display the simple and derived attributes for each bank, along with the owning corporation
create or replace view display_bank_stats as
(select bank.bankID as bank_identifier, corporation.shortName as name_of_corporation, bank.bankName as name_of_bank, bank.street, bank.city, bank.state, bank.zip, nullif(count(bank_account.accountID), 0) as number_of_accounts, bank.resAssets as bank_assets, ifnull(sum(bank_account.balance),0) + ifnull(bank.resAssets, 0) as total_assets
from (bank join corporation on bank.corpID = corporation.corpID
left outer join bank_account on bank.bankID = bank_account.bankID)
group by bank.bankID);

-- [22] display_corporation_stats()
-- Display the simple and derived attributes for each corporation
create or replace view display_corporation_stats as
select corporation.corpID as corporation_identifier, shortName as short_name, longName as formal_name, number_of_banks, resAssets as corporation_assets, (ifnull(tot, 0)+resAssets) as total_assets from corporation left outer join (select Count(BankID) as number_of_banks, sum(total_assets) as tot, corpID from (select bank.bankID, corporation.shortName, bank.bankName, ifnull(sum(bank_account.balance),0) + ifnull(bank.resAssets, 0) as total_assets, bank.corpID
from (bank join corporation on bank.corpID = corporation.corpID
left outer join bank_account on bank.bankID = bank_account.bankID)
group by bank.bankID) as s group by corpID) as a ON corporation.corpID = a.corpID;
    -- Uncomment above line and implement your code here
-- [23] display_customer_stats()
-- Display the simple and derived attributes for each customer
create or replace view display_customer_stats as
select P.perID as person_identifier, taxID as tax_identifier,
    (select CONCAT(firstName, " ", lastName)) as customer_name,
			birthdate as date_of_birth, dtJoined as joined_system,
            street, city, state, zip,
            nullif(count(A.accountID), 0) as number_of_accounts,
            ifnull(sum(BA.balance), 0) as customer_assets
    from (((person P inner join bank_user B on P.perID = B.perID)
    inner join customer C on P.perID = C.perID)
    left outer join access A on P.perID = A.perID)
    left outer join bank_account BA on (A.accountID = BA.accountID and A.bankID = BA.bankID)
    group by P.perID;
    -- Uncomment above line and implement your code here












-- [24] display_employee_stats()
-- Display the simple and derived attributes for each employee
create or replace view display_employee_stats as
select table4.perID,table4.tax_identifier,table4.EmpName,table4.date_of_birth,table4.joined_system,table4.street,table4.city,table4.state,table4.zip, NULLIF(table4.number_of_banks, 0),table5.bank_assets 
from 
(select employee.perID, bank_user.taxID as tax_identifier, concat(bank_user.firstName," ",bank_user.lastName) as EmpName, birthdate as date_of_birth, dtJoined as joined_system, street, city, state, zip, count(bankID) as number_of_banks from workFor 
	right outer join employee on employee.perID=workFor.perID  join bank_user on bank_user.perID = employee.perID group by perID) as table4 
left join (select perID,resAssets+balance as bank_assets from (select perID, sum(resAssets) as resAssets from bank join workFor on bank.bankID=workFor.bankID group by workFor.perID) as table1 
	natural join (select perID,sum(balance) as balance from bank_account join workFor on bank_account.bankID=workFor.bankID group by perID) as table2) as table5 
on table4.perID = table5.perID;
